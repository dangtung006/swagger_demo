const { makeResponse } = require("../common/util/resp.ultil");
const {
    BadRequestError,
    InternalServerError
} = require("../common/response/index");
const ClaimRepository = require("../repositories/claim");
const ClaimRepositoryObj = new ClaimRepository();
const url = require('url');
class ClaimService {

    static async getClaimList({ userId, page, limit, req }) {
        let result = await ClaimRepositoryObj.getListByConditions({ conditions : { userId : userId } ,  page, limit})
        return result.map(r=>({
            ...r._doc,
            document :  url.format( {
                protocol: req.protocol,
                host: req.get('host'),
                pathname: `/public/uploads/${r._doc.document}`
            })
        }))
    }

    static async getClaimById({ id, userId, req }) {
        
        let result = await ClaimRepositoryObj.getOneByConditions({ userId : userId, _id : id });

        if(!result){
            throw new BadRequestError({
                message : 'Invalid Params'
            })
        }

        return {
            ...result._doc,
            document : url.format( {
                protocol: req.protocol,
                host: req.get('host'),
                pathname: `/public/uploads/${result._doc.document}`
            })

        }
    };

    static async handleCreateClaim({
        userId,
        document,
        amount,
        req
    }) {
        let result = await ClaimRepositoryObj.create({
            userId , document, amount
        });

        return {
            id : result._id,
            document : url.format( {
                protocol: req.protocol,
                host: req.get('host'),
                pathname: `/public/uploads/${result.document}`
            })
        }
       
    }
}

module.exports = ClaimService;