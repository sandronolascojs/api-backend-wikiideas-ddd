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
      img: article.img
    }
  }
}
