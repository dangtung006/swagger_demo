const {
    SuccessResponse,
    CreatedResponse,
    BadRequestError
} = require("../common/response/index");
const { makeResponse } = require("../common/util/resp.ultil");
const ClaimService = require("../services/claim");
const ClaimDTO = require('../dto/claim');


const getList_Claim = async (req, res) => {
    const Claim = new ClaimDTO({
        ...req.query,
        userId: req.user
    });

    const isValidInputs = Claim.validateGetList();

    if (isValidInputs && isValidInputs["error"]) {
        throw new BadRequestError(
            isValidInputs["error"].message
        );
    }

    return new SuccessResponse({ 
        message : "ok", 
        metaData : makeResponse( await ClaimService.getClaimList({
            ...Claim,
            req : req
        }) ) 
    }).send(res);

}

const handleCreate_Claim = async (req, res) => {
    const {
        filename : document
    } = req.file;
    
    const Claim = new ClaimDTO({
        ...req.body,
        document : document,
        userId: req.user
    });

    const isValidInputs = Claim.validateCreate();
    if (isValidInputs && isValidInputs["error"]) {
        throw new BadRequestError(
            isValidInputs["error"].message
        );
    }

    return new CreatedResponse({ 
        message : "ok", 
        metaData : makeResponse(await ClaimService.handleCreateClaim({
            ...Claim,
            req : req
        })) 
    }).send(res);
}



const getDetail_Claim = async (req, res) => {
    const Claim = new ClaimDTO({
        id : req.params.id,
        userId: req.user
    });
   
    const isValidInputs = Claim.validateGetDetail();

    if (isValidInputs && isValidInputs["error"]) {
        throw new BadRequestError(
            isValidInputs["error"].message
        );
    }
  
    return new SuccessResponse({
        message : "ok", 
        metaData : makeResponse(await ClaimService.getClaimById({
            ...Claim,
            req : req
        }))
    }).send(res);
}

module.exports = {
    getList_Claim,
    getDetail_Claim,
    handleCreate_Claim
}