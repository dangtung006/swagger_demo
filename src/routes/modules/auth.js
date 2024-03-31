const express = require("express");
const BaseRoute = require("./base");
const { apiAsyncWrapper } = require("../../middlewares/request");

const {
    handle_signIn
} = require("../../controller/auth");


class AuthRoutes extends BaseRoute {
    constructor() {
        super({ router: express.Router() });
        this.initRoutes();
    }

    initRoutes() {
    /**
     * @openapi
     * /api/auth/login:
     *  post:
     *     tags:
     *     - Claim Controller
     *     summary: Create a claim
     *     requestBody:
     *      required: true
     *      content:
     *        application/json:
     *           schema:
     *            type: object
     *            required:
     *              - username
     *            properties:
     *              username:
     *                type: string
     *     responses:
     *      201:
     *        description: Created
     *      409:
     *        description: Conflict
     *      404:
     *        description: Not Found
     *      500:
     *        description: Server Error
     */
        this.router.post('/login', apiAsyncWrapper(handle_signIn));
    }
}

module.exports = AuthRoutes;