const {
    StatusCodes,
    ReasonPhrases
} = require("../const/http/index");

class BaseErrorResponse extends Error {
    constructor({ message, status , reasonStatusCode }) {
        super(message);
        this.status = status;
        this.reasonStatusCode = reasonStatusCode;
    }
}

class ConflictRequestErrorResponse extends BaseErrorResponse {

    constructor({
        message = ReasonPhrases.CONFLICT
    }) {
        super({
            message, 
            status : StatusCodes.CONFLICT,
            reasonStatusCode : ReasonPhrases.CONFLICT
        })
    }
}

class ForbidenRequestError extends BaseErrorResponse {
    constructor({
        message = ReasonPhrases.FORBIDDEN
    }) {
        super({
            message,
            status : StatusCodes.FORBIDDEN,
            reasonStatusCode : ReasonPhrases.FORBIDDEN
        })
    }
}

class BadRequestError extends BaseErrorResponse {
    constructor({
        message = ReasonPhrases.BAD_REQUEST
    }) {
        super({
            message,
            status : StatusCodes.BAD_REQUEST,
            reasonStatusCode : ReasonPhrases.BAD_REQUEST
        })
    }
}

class InternalServerError extends BaseErrorResponse {
    constructor({
        message = ReasonPhrases.INTERNAL_SERVER_ERROR
    }) {
        super({
            message,
            status : StatusCodes.INTERNAL_SERVER_ERROR,
            reasonStatusCode : ReasonPhrases.INTERNAL_SERVER_ERROR
        })
    }
}

class NotFoundError extends BaseErrorResponse {
    constructor({
        message = ReasonPhrases.NOT_FOUND
    }) {
        super({
            message,
            status : StatusCodes.NOT_FOUND,
            reasonStatusCode : ReasonPhrases.NOT_FOUND
        })
    }
}

class AuthFailureError extends BaseErrorResponse {
    constructor({
        message = ReasonPhrases.UNAUTHORIZED
    }) {
        super({
            message,
            status : StatusCodes.UNAUTHORIZED,
            reasonStatusCode : ReasonPhrases.UNAUTHORIZED
        })
    }
}

module.exports = {
    ConflictRequestErrorResponse,
    ForbidenRequestError,
    BadRequestError,
    InternalServerError,
    NotFoundError,
    AuthFailureError
}