import { IArticle } from '../../../../domain/IArticle'
import { IArticlesRepository } from '../../../../domain/IArticlesRepository'

import { AppError, AppErrorType } from '../../../../shared/errors/appError'

export class InMemoryRepository implements IArticlesRepository {
  private articles: IArticle[] = []

  async create (article: IArticle): Promise<IArticle> {
    this.articles.push(article)

    return article
  }

  async updateById (article: IArticle): Promise<IArticle> {
    const index = this.articles.findIndex((a) => a.id === article.id)

    if (index === -1) throw new AppError('Article not found', 404, AppErrorType.NOT_FOUND)
    this.articles[index] = article
    return article
  }

  async deleteById (id: string): Promise<void> {
    const index = this.articles.findIndex((a) => a.id === id)

    if (index === -1) throw new AppError('Article not found', 404, AppErrorType.NOT_FOUND)

    this.articles.splice(index, 1)
  };

  async getById (id: string): Promise<IArticle> {
    const article = this.articles.find((a) => a.id === id)

    if (article === undefined) throw new AppError('Article not found', 404, AppErrorType.NOT_FOUND)

    return article
  }

  async getAll (): Promise<IArticle[]> {
    return this.articles
  };
}
