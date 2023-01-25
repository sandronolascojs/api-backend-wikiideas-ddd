import { RequestHandler, Router } from 'express'

import { CreateArticleController } from '../controllers/createArticleController'
import { GetByIdArticleController } from '../controllers/getByIdArticleController'
import { GetAllArticlesController } from '../controllers/getAllArticlesController'
import { UpdateArticleByIdController } from '../controllers/updateArticleByIdController'

import { zodValidatorSchema } from '../middlewares/zodValidatorMiddleware'
import { createArticleSchema } from '../dtos/createArticleDTO'
import { updateArticleSchema } from '../dtos/updateArticleDTO'

export const articleRoute = Router()

const createArticleController = new CreateArticleController()
const getByIdArticleController = new GetByIdArticleController()
const getAllArticlesController = new GetAllArticlesController()
const updateArticleByIdController = new UpdateArticleByIdController()

articleRoute.post('/', zodValidatorSchema(createArticleSchema) as RequestHandler, createArticleController.handle as RequestHandler)
articleRoute.get('/:id', getByIdArticleController.handle as RequestHandler)
articleRoute.get('/', getAllArticlesController.handle as RequestHandler)
articleRoute.put('/:id', zodValidatorSchema(updateArticleSchema) as RequestHandler, updateArticleByIdController.handle as RequestHandler)
