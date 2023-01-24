import { Request, Response } from 'express'
import { container } from 'tsyringe'

import { CreateArticleUseCase } from '../../application/createArticleUseCase'

export class CreateArticleController {
  async handle (request: Request, response: Response): Promise<Response> {
    const { title, content, img } = request.body

    const createArticleUseCase = container.resolve(CreateArticleUseCase)

    const savedArticle = await createArticleUseCase.execute({
      title,
      content,
      img
    })

    return response.status(201).json({article: savedArticle})
  }
}
