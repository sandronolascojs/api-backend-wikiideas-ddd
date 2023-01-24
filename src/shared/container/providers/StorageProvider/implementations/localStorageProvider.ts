import { promises } from 'node:fs'
import { resolve } from 'node:path'

import { IStorageProvider } from '../IStorageProvider'

export class LocalStorageProvider implements IStorageProvider {
  async saveFile (file: string, folder: string): Promise<string> {
    await promises.rename(
      resolve(__dirname, '..', '..', '..', '..', 'tmp', file),
      resolve(__dirname, '..', '..', '..', '..', 'tmp', folder, file)
    )

    return file
  }

  async deleteFile (file: string, folder: string): Promise<void> {
    const filePath = resolve(__dirname, '..', '..', '..', '..', 'tmp', file)

    try {
      await promises.stat(filePath)
    } catch {
      return
    }

    await promises.unlink(filePath)
  }
}
