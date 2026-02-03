import { PrismaClient } from './generated/client'
import { PrismaPg } from '@prisma/adapter-pg'

const connectionString = process.env.DATABASE_URL

if(!connectionString){
    throw Error('Connection string not set on environment')
}

const adapter = new PrismaPg({connectionString})
const prisma = new PrismaClient({adapter})

export default prisma;