const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Mini Claim API',
            description: "API endpoints for a mini claim documented on swagger",
            version: '1.0.0',
        },
        servers: [
        ],
        // security: {
        //     bearerAuth: []
        // },
        // components: {
        //     securitySchemes: {
        //         bearerAuth: {
        //             type: 'http',
        //             scheme: 'bearer',
        //             in: 'header'
        //         }
        //     }
        // },

        // "paths": {
        //     "/api/claim": {
        //         "get": {
        //             "security": [
        //                 {
        //                     "bearerAuth": []
        //                 }
        //             ],
        //         }
        //     }
        // }
        path : {
            "/upload" :{
                "post" : {
                    summary: "Upload a file",
                    requestBody: {

                        required: true,
                        content: {
                            "multipart/form-data": {

                                schema: {

                                    type: "object",
                                    properties:
                                        {

                                            file : {

                                                type: 'string',
                                                format: 'binary'
                                            }
                                        }
                                }
                            }
                        }
                    },
                    responses: {
                        '200': "description: File uploaded successfully",
                        '400': "Bad request - file upload failed",
                        '500' : "description: Internal server error"
                    }
                
                }
            }
        }
    },
    apis: ['./src/routes/modules/*.js'],
}

const swaggerSpec = swaggerJsdoc(options)

module.exports = function swaggerDocs(app, port) {
    app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec))
    app.get('/docs.json', (req, res) => {
        res.setHeader('Content-Type', 'application/json')
        res.send(swaggerSpec)
    })
}