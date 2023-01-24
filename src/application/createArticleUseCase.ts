import { inject, injectable } from 'tsyringe'

import { IArticle } from '../domain/IArticle'
import { Article } from '../domain/Article'
import { IArticlesRepository } from '../domain/IArticlesRepository'

@injectable()
export class CreateArticleUseCase {
  constructor (
    @inject('ArticlesRepository')
    private readonly articlesRepository: IArticlesRepository
  ) {}

  async execute (article: IArticle): Promise<IArticle> {
    const newArticle = new Article(article)
    const saveArticle = await this.articlesRepository.create(newArticle)

    return saveArticle
  }
}
