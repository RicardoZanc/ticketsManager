import ServiceError from "../errors/serviceError"
import { passwordHelper } from "../helpers/passwordHelper"
import prisma from "../lib/prisma"
import { User } from "../lib/prisma/generated/client"
import { UserResponse, CreateUserDTO } from "./userDTO"

const createUser = async (user: CreateUserDTO): Promise<UserResponse> => {
    await ensureUniqueEmail(user.email)

    const hashPassword = await  passwordHelper.encrypt(user.password)

    const createdUser: User = await prisma.user.create({
        data: {
            name: user.name,
            email: user.email,
            hashPassword
        }
    })
    const userResponse: UserResponse = createdUser
    delete userResponse.hashPassword
    return userResponse;
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