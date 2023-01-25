import { Request, Response } from 'express'
import { container } from 'tsyringe'

import { CreateArticleUseCase } from '../../application/createArticleUseCase'
import { SaveImageUseCase } from '../../application/saveImageUseCase'

export class CreateArticleController {
  async handle (request: Request, response: Response): Promise<Response> {
    const { title, content } = request.body
    const img = request.file?.filename ?? null

    const createArticleUseCase = container.resolve(CreateArticleUseCase)
    const saveImageUseCase = container.resolve(SaveImageUseCase)

    if (img !== null) {
      await saveImageUseCase.execute(img)
    }

    const savedArticle = await createArticleUseCase.execute({
      title,
      content,
      img
    })

    return response.status(201).json({ article: savedArticle })
  }
}
