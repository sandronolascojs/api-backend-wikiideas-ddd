import { connection } from 'mongoose'

export const mongoDbConnection = async (): Promise<void> => {
  try {
    await connection.openUri(String(process.env.MONGO_URL))
    console.log('Connected to MongoDB')
  } catch (error) {
    console.log(error)
    await connection.close()
  }
}

mongoDbConnection()
  .catch(console.error)
