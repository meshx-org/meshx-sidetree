export const SERVICE_PORT = process.env.PORT ? parseInt(process.env.PORT) : 2001
export const SERVICE_HOST = process.env.HOST ?? 'localhost'

export const MONGO_URL = process.env.MONGO_URL ?? 'mongodb://localhost:27017/'
export const MONGO_DB = process.env.MONGO_DB ?? 'test-mongodb'
