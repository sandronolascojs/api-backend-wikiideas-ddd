import { Schema, model } from 'mongoose'
import { IArticle } from '../../../../../domain/IArticle'

const ArticleSchema = new Schema<IArticle>({
  id: { type: String, required: true, index: true, unique: true },
  title: { type: String, required: true },
  content: { type: String, required: true },
  img: { type: String, required: false, default: null },
  createdAt: { type: Date, default: Date.now }
},
{
  versionKey: false,
  timestamps: false
})

export default model<IArticle>('Article', ArticleSchema)
