import 'reflect-metadata'
import { describe, expect, it} from 'vitest'

import { CreateArticleUseCase } from './CreateArticleUseCase'
import { GetByIdArticleUseCase } from './getByIdArticleUseCase'
import { InMemoryRepository } from '../infraestructure/database'

import { AppError, AppErrorType } from '../shared/errors/appError'

const repository = new InMemoryRepository()
const createArticleUseCase = new CreateArticleUseCase(repository)
const getByIdArticleUseCase = new GetByIdArticleUseCase(repository)

describe('GetByIdArticleUseCase', () => {
    it('should get an article by id', async () => {
        const article = {
            title: 'Test',
            content: 'Test content',
            img: 'hello.png'
        }

        const result = await createArticleUseCase.execute(article)

        const articleById = await getByIdArticleUseCase.execute(String(result.id))

        expect(articleById).toEqual({
            id: expect.any(String),
            title: 'Test',
            content: 'Test content',
            img: 'hello.png',
            createdAt: expect.any(Date),
        })
    })

    it('should throw an error if the article does not exist', async () => {
        const result = getByIdArticleUseCase.execute('123')

        await expect(result).rejects.toEqual(new AppError('Article not found', 404, AppErrorType.NOT_FOUND))
    })
})
