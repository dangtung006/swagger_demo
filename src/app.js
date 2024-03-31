const AppRoutes = require("./routes/index");

const {
    errorHandler,
    setCustomMiddleware,
    setBodyParser,
    setAllowAccess,
    setStaticFile
} = require("./middlewares/index");

const initSecurityMiddlewares = (app) => {
    // setAllowAccess(app, allowOrigins)
}
const initCommonMiddlewares = (app, express) => {
    setBodyParser(app, express);
    setStaticFile(app, express, '/public', 'public')
}

const initAppRoutes = (app) => {
    app.use(AppRoutes());
    setCustomMiddleware(app, errorHandler);
}

const initApprocess = (app) => {
 
    app.listen(3000, () => {
        console.log("app listen at port", 3000);
    });
}

module.exports = async function (app, express) {
    initSecurityMiddlewares(app);
    initCommonMiddlewares(app, express);
    initAppRoutes(app);
    initApprocess(app);
}