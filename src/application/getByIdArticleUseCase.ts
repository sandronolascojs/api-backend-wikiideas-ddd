import { inject, injectable } from 'tsyringe'

import { IArticlesRepository } from '../domain/IArticlesRepository'
import { IArticle } from '../domain/IArticle'

@injectable()
export class GetByIdArticleUseCase {
  constructor (
    @inject('ArticlesRepository')
    private readonly articlesRepository: IArticlesRepository
  ) {}

  async execute (id: string): Promise<IArticle> {
    return await this.articlesRepository.getById(id)
  }
}
