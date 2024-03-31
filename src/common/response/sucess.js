const {
    StatusCodes,
    ReasonPhrases
} = require("../const/http/index");

class BaseResponse {
    constructor({
        message,
        statusCode,
        reasonStatusCode,
        metaData
    }) {
        this.metaData = metaData ? metaData : {}
        this.message = message ? message : reasonStatusCode
        this.status = statusCode;
        this.reasonStatusCode = reasonStatusCode;
    }

    send(res, headers = {}) {
        return res.status(this.status).json(this);
    }
}

class CreatedResponse extends BaseResponse {
    constructor({
        message,
        metaData,
        opt
    }) {

        super({
            message,
            statusCode : StatusCodes.CREATED,
            reasonStatusCode : ReasonPhrases.CREATED,
            metaData 
        });

        this.opt = opt;
    }
}

class SuccessResponse extends BaseResponse {
    constructor({ 
        message,
        metaData,
        opt 
    }) {
        super({
            message,
            metaData,
            statusCode : StatusCodes.OK,
            reasonStatusCode : ReasonPhrases.OK,
        })
        this.opt = opt;
    }
}

module.exports = {
    SuccessResponse,
    CreatedResponse
}