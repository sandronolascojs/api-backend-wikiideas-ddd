import { inject, injectable } from 'tsyringe'

import { IArticle } from '../domain/IArticle'
import { IArticlesRepository } from '../domain/IArticlesRepository'

import { AppError, AppErrorType } from '../shared/errors/appError'

@injectable()
export class GetAllArticlesUseCase {
  constructor (
    @inject('ArticlesRepository')
    private readonly articlesRepository: IArticlesRepository
  ) {}

  async execute (): Promise<IArticle[]> {
    const articles = await this.articlesRepository.getAll()

    if (articles.length === 0) throw new AppError('No articles found', 404, AppErrorType.NOT_FOUND)

    return articles
  }
}
