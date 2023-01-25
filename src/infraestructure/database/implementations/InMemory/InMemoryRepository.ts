import { IArticle } from '../../../../domain/IArticle'
import { IArticlesRepository } from '../../../../domain/IArticlesRepository'

export class InMemoryRepository implements IArticlesRepository {
  private articles: IArticle[] = []

  async create (article: IArticle): Promise<IArticle> {
    this.articles.push(article)

    return article
  }

  async updateById (id: string, article: IArticle): Promise<IArticle | null> {
    const index = this.articles.findIndex((a) => a.id === id)

    if (index === -1) return null

    this.articles[index] = { ...this.articles[index], ...article }

    return this.articles[index]
  }

  async deleteById (id: string): Promise<void> {
    const index = this.articles.findIndex((a) => a.id === id)

    this.articles.splice(index, 1)
  };

  async getById (id: string): Promise<IArticle | null> {
    const article = this.articles.find((a) => a.id === id)

    if (article === undefined) return null

    return article
  }

  async getAll (): Promise<IArticle[]> {
    return this.articles
  };
}
