import { promises } from 'node:fs'
import { Request, Response, NextFunction } from 'express'
import { ZodError } from 'zod'

export const zodValidatorSchema = (schema: any) => async (request: Request, response: Response, next: NextFunction) => {
  try {
    await schema.parseAsync(request.body)
    next()
  } catch (error) {
    if (error instanceof ZodError) {
      if (request.file !== null) {
        await promises.unlink(request.file?.path as string)
      }

      return response.status(400).json({
        error: error.issues.map(error => {
          return {
            path: error.path[0],
            message: error.message
          }
        })
      })
    }
  }
}
