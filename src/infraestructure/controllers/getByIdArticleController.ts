import { Request, Response } from 'express'
import { container } from 'tsyringe'

import { GetByIdArticleUseCase } from '../../application/getByIdArticleUseCase'
import { ArticleViewModel } from '../views/articleViewModel'

const articleViewModel = new ArticleViewModel()

export class GetByIdArticleController {
  async handle (request: Request, response: Response): Promise<Response> {
    const { id } = request.params

    console.log(id)

    const getByIdArticleUseCase = container.resolve(GetByIdArticleUseCase)

    const article = await getByIdArticleUseCase.execute(id)

    const articleView = articleViewModel.fromDomain(article)

    return response.json({ article: articleView })
  }
}
