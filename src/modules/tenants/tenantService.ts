import ServiceError from "../../errors/serviceError"
import prisma from "../../lib/prisma"
import { authService } from "../../auth/authService"
import { createTenantDTO } from "./tenantDTO"


const ensureUniqueCNPJ = async  (cnpj: string) => {
    const tenantCount = await prisma.tenant.count({
        where: {
            cnpj
        }
    })
    if(tenantCount){
        throw new ServiceError('Tenant already exists', 406)
    }
}

const createTenant = async (tenant: createTenantDTO) => {

    await ensureUniqueCNPJ(tenant.cnpj)
    await authService.ensureUniqueEmail(tenant.firstUser.email)

    const tenantToCreate = {
            name: tenant.name,
            cnpj: tenant.cnpj,
            users: {
                create: tenant.firstUser
            }
        }

   const result = await prisma.tenant.create({
        data: tenantToCreate,
        include: {users: true}

    })

    console.log(result)
}