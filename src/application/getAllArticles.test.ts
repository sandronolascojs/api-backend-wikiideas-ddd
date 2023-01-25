import "reflect-metadata"

import { describe, expect, it } from "vitest"

import { GetAllArticlesUseCase } from "./getAllArticlesUseCase"
import { InMemoryRepository } from "../infraestructure/database"
import { CreateArticleUseCase } from "./CreateArticleUseCase"

import { AppError, AppErrorType } from '../shared/errors/appError';

const repository = new InMemoryRepository()
const createArticleUseCase = new CreateArticleUseCase(repository)
const getAllArticlesUseCase = new GetAllArticlesUseCase(repository)

describe("GetAllArticlesUseCase", () => {
    it("should throw an error if there are no articles", async () => {
        const result = getAllArticlesUseCase.execute()

        await expect(result).rejects.toEqual(new AppError("No articles found", 404, AppErrorType.NOT_FOUND))
    })

    it("should get all articles", async () => {
        const article = {
            title: "Test",
            content: "Test content",
            img: null,
        }

        const articleTwo = {
            title: "Test 2",
            content: "Test content 2",
            img: null,
        }
    
        await createArticleUseCase.execute(article)
        await createArticleUseCase.execute(articleTwo)
    
        const result = await getAllArticlesUseCase.execute()
    
        expect(result).toEqual([
        {
            id: expect.any(String),
            title: "Test",
            content: "Test content",
            img: null,
            createdAt: expect.any(Date),
        },
        {
            id: expect.any(String),
            title: "Test 2",
            content: "Test content 2",
            img: null,
            createdAt: expect.any(Date),
        }
        ])
    })
})