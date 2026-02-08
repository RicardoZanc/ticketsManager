import { type_user } from "../../lib/prisma/generated/enums"

export interface createTenantDTO {
            name: string,
            cnpj: string,
            firstUser: firstUserDTO
        }

interface firstUserDTO {
        name: string,
        email: string,
        hashPassword: string
        type: type_user
        isAdmin: boolean
}
