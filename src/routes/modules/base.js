class BaseRoute {
    constructor({ router }){
        this.router = router ? router : null
    }
    
    initRoutes(){}

}

module.exports = BaseRoute;