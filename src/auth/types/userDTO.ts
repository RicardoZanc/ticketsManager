import { type_user } from "../../lib/prisma/generated/enums"

interface CreateUserDTO {
    tenant_id: string,
    name: string,
    email: string,
    type: type_user,
    isAdmin: boolean,
    password: string,
    confirmPassword: string
}

interface loginDTO {
    email: string,
    password: string
}

type UserResponse = {
    tenant_id: string,
    name: string,
    email: string,
    type: type_user,
    isAdmin: boolean,
    hashPassword?: string
}

export {
    CreateUserDTO,
    loginDTO,
    UserResponse
}