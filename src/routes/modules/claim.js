const express = require("express");
const BaseRoute = require("./base");
const { apiAsyncWrapper } = require("../../middlewares/request");
const multer = require('multer');
const path = require("path");
const {
    uploadPath
} = require("../../configs/const")
const uploadDir = path.join(__dirname, uploadPath);

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, uploadDir);
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname);
    }
});
const upload = multer({ storage: storage });
const {
    handleCreate_Claim,
    getDetail_Claim,
    getList_Claim
} = require("../../controller/claim");


class DeviceRoutes extends BaseRoute {
    constructor({ middlewares }) {
        super({ router: express.Router() });
        this.initRoutes(middlewares);
    }

    initRoutes(middlewares) {
        const { auth } = middlewares;
        auth && this.router.use(apiAsyncWrapper(auth));
        /**
         * @openapi
         * '/api/claim':
         *  get:
         *     tags:
         *     - Claim Controller
         *     summary: Get list claim
         *     parameters:
         *      - name : auth
         *        in : header
         *        require : true
         *      - name: page
         *        in: query
         *        required: true
         *      - name: limit
         *        in: query
         *        required: true
         *     responses:
         *      200:
         *        description: Fetched Successfully
         *      400:
         *        description: Bad Request
         *      404:
         *        description: Not Found
         *      500:
         *        description: Server Error
         */
        this.router.get('/', apiAsyncWrapper(getList_Claim));
        /**
         * @openapi
         * '/api/claim/{id}':
         *  get:
         *     tags:
         *     - Claim Controller
         *     summary: Get a specific claim by id
         *     parameters:
         *      - name : auth
         *        in : header
         *        require : true
         *      - name: id
         *        in: path
         *        description: The username of the user
         *        required: true
         *     responses:
         *      200:
         *        description: Fetched Successfully
         *      400:
         *        description: Bad Request
         *      404:
         *        description: Not Found
         *      500:
         *        description: Server Error
         */
        this.router.get('/:id', apiAsyncWrapper(getDetail_Claim));
        /**
         * @openapi
         * '/api/claim':
         *  post:
         *     tags:
         *     - Claim Controller
         *     summary: Create a claim
         *     parameters:
         *      - name : auth
         *        in : header
         *        require : true
         *     requestBody:
         *      required: true
         *      content:
         *        multipart/form-data:
         *           schema:
         *            type: object
         *            required:
         *              - amount
         *              - document
         *            properties:
         *              amount:
         *                type: number
         *                default: 0
         *              document : 
         *                 type : string
         *                 format : binary
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
        this.router.post('/', upload.single('document'), apiAsyncWrapper(handleCreate_Claim));
    }
}

module.exports = DeviceRoutes;