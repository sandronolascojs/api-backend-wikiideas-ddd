import { Router } from 'express'

import { articleRoute } from './articles.routes'

const routes = Router()

routes.use('/articles', articleRoute)

export default routes
