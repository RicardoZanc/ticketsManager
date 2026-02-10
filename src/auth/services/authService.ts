import { ConflictError } from "../../errors/ConflictError"
import { passwordHelper } from "../../helpers/passwordHelper"
import prisma from "../../lib/prisma"
import { ensureTenantExists } from "../../modules/tenants/services/tenantService"
import { UserResponse, CreateUserDTO } from "../types/userDTO"

const createUser = async (user: CreateUserDTO): Promise<UserResponse> => {
    await ensureTenantExists(user.tenant_id)
    await ensureUniqueEmailOnTenant(user.email, user.tenant_id)

    const hashPassword = await passwordHelper.encrypt(user.password)

    const createdUser: UserResponse = await prisma.user.create({
        data: {
            tenant_id: user.tenant_id,
            name: user.name,
            email: user.email,
            type: user.type,
            isAdmin: user.isAdmin,
            hashPassword
        }
    })

    delete createdUser.hashPassword
    return createdUser;
}

const ensureUniqueEmailOnTenant = async (email: string, tenant_id: string) => {
    const emailCount = await prisma.user.count({
        where: {
            email,
            tenant_id
        }
    })
    if(emailCount){
        throw new ConflictError('Already exists user with this email in this tenant')
    }
}



export const authService = {
    createUser,
    ensureUniqueEmail: ensureUniqueEmailOnTenant
}