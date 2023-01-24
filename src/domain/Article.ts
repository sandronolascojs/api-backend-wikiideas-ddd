import { v4 as uuid } from 'uuid'

import { IArticle } from './IArticle'

export class Article implements IArticle {
  id?: string
  title: string
  content: string
  img: string | null
  createdAt?: Date

  constructor ({ id, title, content, img, createdAt }: IArticle) {
    this.id = id ?? uuid()
    this.title = title
    this.content = content
    this.img = img ?? null
    this.createdAt = createdAt ?? new Date()
  }
}
