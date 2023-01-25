import { IArticle } from '../../domain/IArticle'

export interface IArticleViewModel {
  id?: string
  title: string
  content: string
  img: string | null
}

export class ArticleViewModel {
  fromDomain (article: IArticle): IArticleViewModel {
    return {
      id: article.id,
      title: article.title,
      content: article.content,
      img: process.env.disk === 'local' || article.img === null
        ? article.img
        : encodeURI(`${process.env.AWS_BUCKET_URL as string}/${article.img}`)
    }
  }
}
