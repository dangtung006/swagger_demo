const {
    SuccessResponse
} = require("../common/response/index");
const { makeResponse } = require("../common/util/resp.ultil");
const AuthService = require("../services/auth")


const handle_signIn = async (req, res) => {
    const {
        username : user
    } =  req.body
    return new SuccessResponse({ 
        message : "ok", 
        metaData : makeResponse(await AuthService.handleSignIn({
            user : user ? user.trim() : ""
        })) 
    }).send(res);
}


module.exports = {
    handle_signIn
}