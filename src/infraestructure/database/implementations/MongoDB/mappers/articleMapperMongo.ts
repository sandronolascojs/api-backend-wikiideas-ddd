import { Types } from 'mongoose'
import { IArticle } from '../../../../../domain/IArticle'

export interface IArticleMapper {
  toDomain: (article: any) => IArticle
  toPersistence: (article: IArticle) => any
}

interface IArticlePersistence {
  _id?: Types.ObjectId
  id?: string
  title: string
  content: string
  img: string | null
  createdAt?: Date
}

export class ArticleMapperMongo {
  toDomain (article: IArticlePersistence): IArticle {
    return {
      id: article.id,
      title: article.title,
      content: article.content,
      img: article.img,
      createdAt: article.createdAt
    }
  }

  toPersistence (article: IArticle): IArticlePersistence {
    return {
      id: article.id,
      title: article.title,
      content: article.content,
      img: article.img,
      createdAt: article.createdAt
    }
  }
}
