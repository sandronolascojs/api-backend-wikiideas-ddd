
import { randomBytes } from 'node:crypto'
import { resolve } from 'node:path'
import multer from 'multer'
import { lookup } from 'mime-types'

const tmpFolder = resolve(__dirname, '..', '..', 'tmp')

export const uploadConfig = {
  tmpFolder,
  storage: multer.diskStorage({
    destination: tmpFolder,
    filename: (request, file, callback) => {
      const fileName = file.originalname.split('.')[0]
      const fileHash = randomBytes(16).toString('hex')
      const fileType = String(lookup(file.originalname))
      const finalName = `${fileHash}-${fileName}.${fileType}`

      callback(null, finalName)
    }
  })
}
