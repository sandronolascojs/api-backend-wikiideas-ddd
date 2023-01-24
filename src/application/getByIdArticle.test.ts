import 'reflect-metadata'
import { describe, expect, it} from 'vitest'

import { CreateArticleUseCase } from './CreateArticleUseCase'
import { GetByIdArticleUseCase } from './getByIdArticleUseCase'
import { InMemoryRepository } from '../infraestructure/database'

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
})
