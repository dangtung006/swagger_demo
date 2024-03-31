const {
    BadRequestError,
    InternalServerError
} = require("../common/response/index");

const {
    privateKey,
    publicKey
} = require("../configs/const");
const {
    verifyToken,
    createTokenPairs
} = require("../common/util/security.util");

class AuthService {

    static async handleSignIn({
        user
    }) {
        const {
            accessToken,
            refreshToken
        } = createTokenPairs({
            user : user.trim()
        }, publicKey, privateKey);
        return {
            token : accessToken
        };
    }
}

module.exports = AuthService;