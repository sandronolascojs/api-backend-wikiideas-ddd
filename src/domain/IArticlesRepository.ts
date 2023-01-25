import { IArticle } from './IArticle'

export interface IArticlesRepository {
  create: (article: IArticle) => Promise<IArticle>
  updateById: (id: string, article: IArticle) => Promise<IArticle | null>
  deleteById: (id: string) => Promise<void>
  getById: (id: string) => Promise<IArticle | null>
  getAll: () => Promise<IArticle[]>
}
