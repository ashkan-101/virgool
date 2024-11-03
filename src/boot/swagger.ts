import { Application } from "express";
import swaggerJSDoc ,{Options} from "swagger-jsdoc";
import swaggerUi from 'swagger-ui-express'
 
const swaggerOptions: Options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'API Documentation',
      version: '1.0.0',
      description: 'API Information'
    },
    servers: [
      {
        url: `${process.env.APP_URL}:${process.env.APP_PORT}`
      }
    ]
  },
  apis: [`${process.cwd()}/src/modules/**/*Router.ts`]
}

const swaggerDocs = swaggerJSDoc(swaggerOptions)

export function setupSwagger(app: Application){
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs))
}