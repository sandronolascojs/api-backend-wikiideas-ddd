import { Request, Response } from 'express'
import { container } from 'tsyringe'

import { UpdateArticleByIdUseCase } from '../../application/updateArticleByIdUseCase'
import { GetByIdArticleUseCase } from '../../application/getByIdArticleUseCase'
import { SaveImageUseCase } from '../../application/saveImageUseCase'
import { DeleteImageUseCase } from '../../application/deleteImageUseCase'
import { ArticleViewModel } from '../views/articleViewModel'
import { IArticle } from '../../domain/IArticle'

const articleViewModel = new ArticleViewModel()

export class UpdateArticleByIdController {
  async handle (request: Request, response: Response): Promise<Response> {
    const { id } = request.params
    const { title, content } = request.body
    const img = request.file?.filename ?? null

    const updateArticleByIdUseCase = container.resolve(UpdateArticleByIdUseCase)
    const getByIdArticleUseCase = container.resolve(GetByIdArticleUseCase)

    const isArticleExists = await getByIdArticleUseCase.execute(id)

    if (img !== null) {
      const saveImageUseCase = container.resolve(SaveImageUseCase)
      const deleteImageUseCase = container.resolve(DeleteImageUseCase)

      await saveImageUseCase.execute(img)
      await deleteImageUseCase.execute(isArticleExists.img as string)
    }

    const article = await updateArticleByIdUseCase.execute(id, { title, content, img })

    const articleFromDomain = articleViewModel.fromDomain(article as IArticle)

    return response.status(200).json(articleFromDomain)
  }
}
