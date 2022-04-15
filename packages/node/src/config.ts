export const SERVICE_PORT = parseInt(process.env.PORT as string) ?? 8080
export const SERVICE_HOST = process.env.HOST ?? '0.0.0.0'

export const MONGO_URL = process.env.MONGO_URL ?? 'mongodb://localhost:27017/'
export const MONGO_DB = process.env.MONGO_DB ?? 'test-mongodb'
