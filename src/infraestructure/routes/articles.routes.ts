import { RequestHandler, Router } from 'express'

import { CreateArticleController } from '../controllers/createArticleController'
import { GetByIdArticleController } from '../controllers/getByIdArticleController'
import { GetAllArticlesController } from '../controllers/getAllArticlesController';

export const articleRoute = Router()

const createArticleController = new CreateArticleController()
const getByIdArticleController = new GetByIdArticleController()
const getAllArticlesController = new GetAllArticlesController()

articleRoute.post('/', createArticleController.handle as RequestHandler)
articleRoute.get('/:id', getByIdArticleController.handle as RequestHandler)
articleRoute.get('/', getAllArticlesController.handle as RequestHandler)
