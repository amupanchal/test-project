const express = require("express");
const bodyParser = require("body-parser");
const swaggerJsDoc = require('swagger-jsdoc')
const swaggerUi = require('swagger-ui-express')
const { initiMonogoConn } = require("./src/database/mongo");
const port = process.env.PORT || 2022;
const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const options = {
    swaggerDefinition: {
        openapi: '3.0.0',
        info: {
            title: 'NodeJs api Project',
            version: '1.0.0'
        },
        components: {
            securitySchemes: {
                bearerAuth: {
                    in: "header",
                    name: "Authorization",
                    type: "apiKey"
                }
            }
        },
        servers: [{
            url: 'http://localhost:2022/'
        }]
    },
    apis: ['./src/swaggerDoc.js']
}

const swaggerSpce = swaggerJsDoc(options)
app.use('/api-doc', swaggerUi.serve, swaggerUi.setup(swaggerSpce))
const baseRouter = require("./src/baseRouter");
app.use('/api', baseRouter)

app.listen(port, () => {
    initiMonogoConn()
    console.log(`Example app listening on port ${port}`)
})