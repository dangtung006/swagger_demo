const {
    setBodyParser,
    setAllowAccess,
    setCustomMiddleware,
    setStaticFile
} = require("./base");

const {
    errorHandler,
    renderAsyncWrapper,
    apiAsyncWrapper
} = require("./request");



module.exports = {
    setBodyParser,
    setAllowAccess,
    setCustomMiddleware,
    setStaticFile,

    errorHandler,
    renderAsyncWrapper,
    apiAsyncWrapper
}