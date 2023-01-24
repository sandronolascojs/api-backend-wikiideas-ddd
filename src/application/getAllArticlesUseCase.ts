import { inject, injectable } from 'tsyringe'

import { IArticle } from '../domain/IArticle'
import { IArticlesRepository } from '../domain/IArticlesRepository'

@injectable()
export class GetAllArticlesUseCase {
  constructor (
    @inject('ArticlesRepository')
    private readonly articlesRepository: IArticlesRepository
  ) {}

  async execute (): Promise<IArticle[]> {
    return await this.articlesRepository.getAll()
  }
}
