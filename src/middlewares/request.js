
const {
    InternalServerError,
    AuthFailureError
} = require("../common/response/index");
const {
    publicKey
} = require("../configs/const");

const {
    verifyToken
} = require("../common/util/security.util")
const apiAsyncWrapper = (fn) => (req, res, next) => fn(req, res, next).catch(next);

const renderAsyncWrapper = (fnRender) => async(req, res, next) => {
    try{
        const { pathView, pageData, redirectUrl } = await fnRender(req, res, next);
        if(!pathView || !pageData) throw new InternalServerError("something went wrong");
        if(redirectUrl) return res.redirect(redirectUrl);
        return res.render(pathView, pageData);
    }catch(err){
        throw new InternalServerError("something went wrong");
    }
}

const errorHandler = (error, req, res, next) => {
    const statusCode =  error && error.status ?  error.status : 500;
    return res.status(statusCode).json({
        status: "error",
        code: statusCode,
        message: error.message
    });
}

const authentication = async (req, res, next) => {
 
    const accessToken = req.headers['auth'];
    if (!accessToken)
        throw new AuthFailureError({
            message : "Invalid Token"
        });


    verifyToken(accessToken, publicKey, (err, decode) => {
        if (err) {
            throw new InternalServerError({
                message : err.message
            });
        }
        if (!decode.user)
            throw new AuthFailureError({
                message : "Invalid user"
            });

        req.user = decode.user;
        return next();
    });

};

module.exports = { 
    apiAsyncWrapper, 
    renderAsyncWrapper, 
    errorHandler, 
    authentication 
}
