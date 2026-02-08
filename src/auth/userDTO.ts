import { User } from "../lib/prisma/generated/client"

interface CreateUserDTO {
    name: string,
    email: string,
    password: string,
    confirmPassword: string
}
interface loginDTO {
    email: string,
    password: string
}

type UserResponse = {
    name: string,
    email: string,
    hashPassword?: string,
}

export {
    CreateUserDTO,
    loginDTO,
    UserResponse
}