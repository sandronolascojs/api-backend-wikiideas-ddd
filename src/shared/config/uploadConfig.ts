
import { randomBytes } from 'node:crypto'
import { resolve } from 'node:path'
import multer from 'multer'
import { AppError, AppErrorType } from '../errors/appError'

export const tmpFolder = resolve(__dirname, '..', '..', '..', 'tmp')

export const uploadConfig: multer.Options = {
  storage: multer.diskStorage({
    destination: tmpFolder,
    filename: (request, file, callback) => {
      const fileName = file.originalname.split('.')
      const fileHash = randomBytes(16).toString('hex')
      const finalName = `${fileHash}-${fileName[0]}.${fileName[1]}`

      callback(null, finalName)
    }
  }),
  limits: {
    fileSize: Number(process.env.FILE_MAXSIZE_LIMIT)
  },
  fileFilter: (request, file, callback) => {
    const allowedMimes = [
      'image/jpeg',
      'image/pjpeg',
      'image/png',
      'image/gif',
      'image/webp'
    ]

    if (allowedMimes.includes(file.mimetype)) {
      callback(null, true)
    } else {
      callback(new AppError('Invalid file type', 400, AppErrorType.BAD_REQUEST))
    }
  }
}
