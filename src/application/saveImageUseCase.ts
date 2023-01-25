import { inject, injectable } from 'tsyringe'

import { IStorageProvider } from '../shared/container/providers/StorageProvider/IStorageProvider'

@injectable()
export class SaveImageUseCase {
  constructor (
    @inject('StorageProvider')
    private readonly storageProvider: IStorageProvider
  ) {}

  async execute (img: string): Promise<string> {
    const image = await this.storageProvider.saveFile(img)

    return image
  }
}
