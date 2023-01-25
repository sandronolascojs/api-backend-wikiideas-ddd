import { container } from 'tsyringe'

import { LocalStorageProvider } from './implementations/localStorageProvider'
import { S3StorageProvider } from './implementations/s3StorageProvider'

const provider = process.env.disk === 'local' ? LocalStorageProvider : S3StorageProvider

container.registerSingleton(
  'StorageProvider',
  provider
)
