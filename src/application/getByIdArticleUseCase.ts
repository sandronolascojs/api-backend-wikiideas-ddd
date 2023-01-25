import { inject, injectable } from 'tsyringe'

import { IArticlesRepository } from '../domain/IArticlesRepository'
import { IArticle } from '../domain/IArticle'
import { AppError, AppErrorType } from '../shared/errors/appError'

@injectable()
export class GetByIdArticleUseCase {
  constructor (
    @inject('ArticlesRepository')
    private readonly articlesRepository: IArticlesRepository
  ) {}

  async execute (id: string): Promise<IArticle> {
    const article = await this.articlesRepository.getById(id)

    if (article === null) throw new AppError('Article not found', 404, AppErrorType.NOT_FOUND)

    return article
  }
}
