const express = require("express");
const router = express.Router();
const ClaimRoutes = require("./modules/claim");
const AuthRoutes = require("./modules/auth");
const getApiRoute = (route)=> `/api/${route}`;

const { authentication } = require("../middlewares/request");
const middlewares = {
    'auth' : authentication
}

const RouteConfigs = [
    {
        routeName : getApiRoute('claim'),
        router : new ClaimRoutes({ middlewares }).router
    },
    {
        routeName : getApiRoute('auth'),
        router : new AuthRoutes().router
    }
];

const AppRoutes = ()=>{
    for(let idx = 0; idx < RouteConfigs.length; idx++){
        if (RouteConfigs[idx].routeName && RouteConfigs[idx].router) {
            router.use(RouteConfigs[idx].routeName, RouteConfigs[idx].router)
        }
    }
    return router;
}

module.exports = AppRoutes;