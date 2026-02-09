import ServiceError from "../../errors/serviceError"
import prisma from "../../lib/prisma"
import { Tenant } from "../../lib/prisma/generated/client"
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

const createTenant = async (tenant: Tenant) => {

    await ensureUniqueCNPJ(tenant.cnpj)

   const result = await prisma.tenant.create({
        data: tenant,
        include: {users: true}

    })

    console.log(result)
}

export const tenantService = {
    createTenant
}