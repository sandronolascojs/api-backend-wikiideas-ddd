import { inject, injectable } from 'tsyringe'

import { IStorageProvider } from '../shared/container/providers/StorageProvider/IStorageProvider'

@injectable()
export class DeleteImageUseCase {
  constructor (
    @inject('StorageProvider')
    private readonly storageProvider: IStorageProvider
  ) {}

  async execute (img: string): Promise<void> {
    await this.storageProvider.deleteFile(img)
  }
}
