import { IArticle } from '../../../../domain/IArticle'
import { IArticlesRepository } from '../../../../domain/IArticlesRepository'

import ArticleModel from './Models/ArticleModel'
import { ArticleMapperMongo } from './mappers/articleMapperMongo'

const articleMapperMongo = new ArticleMapperMongo()

export class MongoRepository implements IArticlesRepository {
  async create (article: IArticle): Promise<IArticle> {
    const newArticle = await ArticleModel.create(article)
    await newArticle.save()

    return articleMapperMongo.toDomain(newArticle)
  }

  async updateById (id: string, article: IArticle): Promise<IArticle | null> {
    const updatedArticle = await ArticleModel.findOneAndUpdate(
      { id },
      article,
      { new: true }
    )

    if (updatedArticle === null) {
      return null
    }

    return articleMapperMongo.toDomain(updatedArticle)
  }

  async deleteById (id: string): Promise<void> {
    await ArticleModel.findByIdAndDelete({ id })
  }

  async getById (id: string): Promise<IArticle | null> {
    const article = await ArticleModel.findOne({ id })

    if (article === null) return null

    return articleMapperMongo.toDomain(article)
  }

  async getAll (): Promise<IArticle[]> {
    const articles = await ArticleModel.find()

    return articles.map((article) => articleMapperMongo.toDomain(article))
  }
}
