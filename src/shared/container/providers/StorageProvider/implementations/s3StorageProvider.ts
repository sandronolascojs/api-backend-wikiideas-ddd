import { resolve } from 'node:path'
import { promises } from 'node:fs'
import { S3 } from 'aws-sdk'
import sharp from 'sharp'
import { lookup } from 'mime-types'
import { IStorageProvider } from '../IStorageProvider'

import { tmpFolder } from '../../../../config/uploadConfig'

export class S3StorageProvider implements IStorageProvider {
  private readonly client: S3

  constructor () {
    this.client = new S3({
      region: process.env.AWS_REGION
    })
  }

  async saveFile (file: string): Promise<string> {
    const originalPath = resolve(tmpFolder, file)

    const fileContent = await promises.readFile(originalPath)

    const ContentType = lookup(originalPath) as string

    const imageMetadata = await sharp(fileContent).metadata()

    await sharp(fileContent)
      .resize({
        width: imageMetadata.width,
        height: imageMetadata.height
      })
      .jpeg({ quality: 50 })
      .toFile(originalPath)
      .then((data) => data)
      .catch(err => { return err })

    const newImageDirectory = await promises.readFile(originalPath)

    await this.client
      .putObject({
        Bucket: `${String(process.env.AWS_BUCKET)}`,
        Key: file,
        ACL: 'public-read',
        Body: newImageDirectory,
        ContentType
      })
      .promise()

    await promises.unlink(originalPath)

    return file
  }

  async deleteFile (file: string): Promise<void> {
    await this.client
      .deleteObject({
        Bucket: `${String(process.env.AWS_BUCKET)}`,
        Key: file
      })
      .promise()
  }
}
