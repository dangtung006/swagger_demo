var path = require('path');

const setBodyParser = (app, express)=>{
    app.use(express.json());
    app.use(express.urlencoded({ extended : true}));
}
const setStaticFile = (app, express, url, folder) =>{
    folder = path.join(__dirname, `../${folder}`)
    app.use(url, express.static(folder));
}

const setAllowAccess  = (app, allowOrigins)=>{
    app.use(function(req, res, next) {
        const origin = req.headers.origin;

        if (allowOrigins.includes(origin)) {
            res.setHeader('Access-Control-Allow-Origin', origin);
        }

        res.header('Access-Control-Allow-Headers', "X-Requested-With, content-type, Accept");
        res.header('Access-Control-Allow-Methods', "GET, POST, PUT, DELETE");
        res.header('Access-Control-Allow-Credentials', true);
        next();
    });
}

const setCustomMiddleware = (app, midwareFn)=>{
    app.use(midwareFn)
}

module.exports = {
    setBodyParser,
    setAllowAccess,
    setCustomMiddleware,
    setStaticFile
}