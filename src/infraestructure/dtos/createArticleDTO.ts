import { z } from 'zod'

export const createArticleSchema = z.object({
  title: z.string({
    required_error: 'Title is required',
    invalid_type_error: 'Title is invalid'
  }).min(1, {
    message: 'Title must be at least 1 character'
  }).max(100, {
    message: 'Title must be at most 100 characters'
  }),
  content: z.string({
    required_error: 'Content is required',
    invalid_type_error: 'Content is invalid'
  }).min(1, {
    message: 'Content must be at least 1 character'
  }).max(10000, {
    message: 'Content must be at most 10000 characters'
  })
}).strict()
