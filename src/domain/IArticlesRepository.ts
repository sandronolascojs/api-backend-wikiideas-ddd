import { IArticle } from './IArticle'

export interface IArticlesRepository {
  create: (article: IArticle) => Promise<IArticle>
  updateById: (article: IArticle) => Promise<IArticle>
  deleteById: (id: string) => Promise<void>
  getById: (id: string) => Promise<IArticle>
  getAll: () => Promise<IArticle[]>
}
