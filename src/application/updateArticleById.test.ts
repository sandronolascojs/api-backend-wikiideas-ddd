import 'reflect-metadata'
import { describe, expect, it } from "vitest";

import { UpdateArticleByIdUseCase } from "./updateArticleByIdUseCase";
import { CreateArticleUseCase } from "./createArticleUseCase";
import { InMemoryRepository } from "../infraestructure/database/implementations/InMemory/InMemoryRepository";

import { AppError, AppErrorType } from "../shared/errors/appError";

const repository = new InMemoryRepository();
const createArticle = new CreateArticleUseCase(repository);
const updateArticleById = new UpdateArticleByIdUseCase(repository);

describe("updateArticleById", () => {
  it("should update an article by id", async () => {
    const article = await createArticle.execute({
      title: "title",
      content: "content",
      img: null,
    });

    const updatedArticle = await updateArticleById.execute(String(article.id), {
      title: "title updated",
      content: "content updated",
      img: "img updated",
    });

    expect(updatedArticle).toEqual({
        id: article.id,
        title: "title updated",
        content: "content updated",
        img: "img updated",
        createdAt: article.createdAt,
    })
  });

  it("should throw an error if the article does not exist", () => {
    expect(() => updateArticleById.execute("non-existent-id", {
      title: "title updated",
      content: "content updated",
      img: "img updated",
    })).rejects.toEqual(new AppError("Article not found", 404, AppErrorType.NOT_FOUND));
  });
});
