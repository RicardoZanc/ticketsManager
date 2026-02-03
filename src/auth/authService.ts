import ServiceError from "../errors/serviceError"
import prisma from "../lib/prisma"
import { createUserDTO } from "./userDTO"

const createUser = async (user: createUserDTO) => {
    await ensureUniqueEmail('ricardo@email.com')
    return true
}

const ensureUniqueEmail = async (email: string) => {
    const emailCount = await prisma.user.count({
        where: {
            email
        }
    })
    if(emailCount){
        throw new ServiceError('Already exists user with this email', 406)
    }
}



export const authService = {
    createUser
}