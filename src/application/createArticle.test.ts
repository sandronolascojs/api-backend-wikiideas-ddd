import 'reflect-metadata'
import { describe, expect, it} from 'vitest'
import { CreateArticleUseCase } from './CreateArticleUseCase'
import { InMemoryRepository } from '../infraestructure/database'

const repository = new InMemoryRepository()
const createArticleUseCase = new CreateArticleUseCase(repository)

describe('CreateArticleUseCase', () => {
    it('should create an article', async () => {
        const article = {
            title: 'Test',
            content: 'Test content',
            img: null
        }

        const result = await createArticleUseCase.execute(article)

        expect(result).toEqual({
            id: expect.any(String),
            title: 'Test',
            content: 'Test content',
            img: null,
            createdAt: expect.any(Date),
        })
    })
})