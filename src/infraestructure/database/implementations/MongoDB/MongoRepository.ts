import { IArticle } from '../../../../domain/IArticle'
import { IArticlesRepository } from '../../../../domain/IArticlesRepository'

import ArticleModel from './Models/ArticleModel'
import { ArticleMapperMongo } from './mappers/articleMapperMongo'
import { AppError, AppErrorType } from '../../../../shared/errors/appError'

const articleMapperMongo = new ArticleMapperMongo()

export class MongoRepository implements IArticlesRepository {
  async create (article: IArticle): Promise<IArticle> {
    const newArticle = await ArticleModel.create(article)
    await newArticle.save()

    return articleMapperMongo.toDomain(newArticle)
  }

  async updateById (article: IArticle): Promise<IArticle> {
    const updatedArticle = await ArticleModel.findByIdAndUpdate(
      { _id: article.id },
      article,
      { new: true }
    )

    if (updatedArticle === null) throw new AppError('Article not found', 404, AppErrorType.NOT_FOUND)

    return articleMapperMongo.toDomain(updatedArticle)
  }

  async deleteById (id: string): Promise<void> {
    await ArticleModel.findByIdAndDelete({ id })
  }

  async getById (id: string): Promise<IArticle> {
    const article = await ArticleModel.findOne({ id })

    if (article === null) throw new AppError('Article not found', 404, AppErrorType.NOT_FOUND)

    return articleMapperMongo.toDomain(article)
  }

  async getAll (): Promise<IArticle[]> {
    const articles = await ArticleModel.find()

    return articles.map((article) => articleMapperMongo.toDomain(article))
  }
}
