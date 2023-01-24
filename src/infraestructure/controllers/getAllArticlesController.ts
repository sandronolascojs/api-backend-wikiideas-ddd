import { Request , Response } from "express" ;
import { container } from "tsyringe";

import { GetAllArticlesUseCase } from "../../application/getAllArticlesUseCase";
import { ArticleViewModel } from "../views/articleViewModel";

const articleViewModel = new ArticleViewModel();

export class GetAllArticlesController {
    async handle(_request: Request, response: Response) {
        const getAllArticlesUseCase = container.resolve(GetAllArticlesUseCase);

        const articles = await getAllArticlesUseCase.execute();

        const articlesFromDomain = articles.map((article) => {
            return articleViewModel.fromDomain(article);
        })

        return response.status(200).json(articlesFromDomain);
    }
}