import { container } from 'tsyringe'

import './providers'

import { IArticlesRepository } from '../../domain/IArticlesRepository'
import { MongoRepository } from '../../infraestructure/database'

container.registerSingleton<IArticlesRepository>(
  'ArticlesRepository',
  MongoRepository
)
