import { inject, injectable } from 'tsyringe'

import { IArticle } from '../domain/IArticle'

import { IArticlesRepository } from '../domain/IArticlesRepository'
import { AppError, AppErrorType } from '../shared/errors/appError'

@injectable()
export class UpdateArticleByIdUseCase {
  constructor (
    @inject('ArticlesRepository')
    private readonly articlesRepository: IArticlesRepository
  ) {}

  async execute (id: string, article: IArticle): Promise<IArticle | null> {
    const isArticleAlreadyExists = await this.articlesRepository.getById(id)

    if (isArticleAlreadyExists === null) throw new AppError('Article not found', 404, AppErrorType.NOT_FOUND)

    return await this.articlesRepository.updateById(id, article)
  }
}
