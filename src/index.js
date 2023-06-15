import cors from 'cors';
import express from 'express';
import swaggerjsdoc from 'swagger-jsdoc';
import swaggerui from 'swagger-ui-express';
import rootRouter from './routers/rootRouter.js';

const app = express()

app.use(express.json())
app.use(cors())

const options = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "Food app API Docs",
            version: "0.1"
        },
        servers: [
            {
                url: "http://localhost:8080/"
            }
        ]
    },
    apis: ["./routers/*.js"]
}

const spacs = swaggerjsdoc(options)
app.use("/api-docs",
    swaggerui.serve,
    swaggerui.setup(spacs))

app.listen(8080, () => console.log('API started successfully'))
app.use("/api", rootRouter)