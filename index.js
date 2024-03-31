const express    = require("express");
const runApp         = require('./src/app');
const app            = express();
const swaggerDocs       = require("./src/extensions/swagger");
const MyDB                = require("./src/extensions/db")


const main = async ()=>{
    try{
        await MyDB.getInstance();
        await runApp(app, express);
        swaggerDocs(app, 3000);
    }catch(err){
        console.log(err);
    }
}

main()
