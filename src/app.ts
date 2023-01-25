import 'reflect-metadata'
import express, { NextFunction, Request, Response } from 'express'
import swaggerUi from 'swagger-ui-express'
import swaggerJson from './swagger.docs.json'
import 'express-async-errors'
import 'dotenv/config'
import helmet from 'helmet'
import cors from 'cors'
import morgan from 'morgan'

import routes from './infraestructure/routes'

import './infraestructure/database/implementations/MongoDB/config/mongoDbConnection'
import './shared/container'
import { tmpFolder } from './shared/config/uploadConfig'
import { AppError } from './shared/errors/appError'
import { MulterError } from 'multer'

const corsOptions = {
  origin: process.env.CORS_ORIGIN,
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE'
}

const app = express()
app.use(express.json())
app.use(helmet())
app.use(cors(corsOptions))
app.use(morgan('dev'))
app.use('/api/', routes)
app.use('/api/docs', swaggerUi.serve, swaggerUi.setup(swaggerJson))
console.log('Temporary folder directory:', tmpFolder)

app.use(
  (err: Error, request: Request, response: Response, next: NextFunction) => {
    if (err instanceof AppError) {
      return response.status(err.statusCode).json({
        status: err.statusCode,
        message: err.message,
        errorType: err.errorType
      })
    }
    if (err instanceof MulterError) {
      return response.status(400).json({
        status: 404,
        message: err.message,
        errorType: 'BAD_REQUEST'
      })
    }
    return response.status(500).json({
      status: 'error',
      message: `Internal server error - ${err.message}`
    })
  }
)

export default app
