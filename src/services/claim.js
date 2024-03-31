const { makeResponse } = require("../common/util/resp.ultil");
const {
    BadRequestError,
    InternalServerError
} = require("../common/response/index");
const ClaimRepository = require("../repositories/claim");
const ClaimRepositoryObj = new ClaimRepository();

class ClaimService {

    static async getClaimList({ userId, page, limit }) {
        return ClaimRepositoryObj.getListByConditions({ conditions : { userId : userId } ,  page, limit})
    }

    static async getClaimById({ id, userId }) {
        return ClaimRepositoryObj.getOneByConditions({ userId : userId, _id : id })
    };

    static async handleCreateClaim({
        userId,
        document,
        amount
    }) {

        console.log(userId, document, amount);

        return ClaimRepositoryObj.create({
            userId , document, amount
        })
    }
}

module.exports = ClaimService;