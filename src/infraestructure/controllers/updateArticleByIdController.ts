import { Request, Response } from 'express'
import { container } from 'tsyringe'

import { UpdateArticleByIdUseCase } from '../../application/updateArticleByIdUseCase'
import { ArticleViewModel } from '../views/articleViewModel'
import { IArticle } from '../../domain/IArticle'

const articleViewModel = new ArticleViewModel()

export class UpdateArticleByIdController {
  async handle (request: Request, response: Response): Promise<Response> {
    const { id } = request.params
    const { title, content, img } = request.body

    const updateArticleByIdUseCase = container.resolve(UpdateArticleByIdUseCase)

    const article = await updateArticleByIdUseCase.execute(id, { title, content, img })

    const articleFromDomain = articleViewModel.fromDomain(article as IArticle)

    return response.status(200).json(articleFromDomain)
  }
}
