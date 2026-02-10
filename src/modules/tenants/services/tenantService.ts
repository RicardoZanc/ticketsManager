import ServiceError from "../../../errors/serviceError";
import prisma from "../../../lib/prisma";
import { createTenantDTO, ResponseTenant } from "../types/tenantDTO";
import { passwordHelper } from "../../../helpers/passwordHelper";
import { NotFoundError } from "../../../errors/NotFoundError";


const ensureUniqueCNPJ = async (cnpj: string) => {
  const tenantCount = await prisma.tenant.count({
    where: {
      cnpj,
    },
  });
  if (tenantCount) {
    throw new ServiceError("Tenant already exists", 406);
  }
};

const ensureTenantExists = async (id: string)=>{
  const tenantCount = await prisma.tenant.count({
    where:{
      id
    }
  })
  if(!tenantCount){
    throw new NotFoundError('Tenant not Found')
  }

}

const createTenant = async (tenant: createTenantDTO) => {
  await ensureUniqueCNPJ(tenant.cnpj);

  const firstUserHashPasword = await passwordHelper.encrypt(
    tenant.firstUser.password,
  );

  const createdTenant: ResponseTenant = await prisma.tenant.create({
    data: {
      name: tenant.name,
      cnpj: tenant.cnpj,
      users: {
        create: {
          name: tenant.firstUser.name,
          email: tenant.firstUser.email,
          isAdmin: true,
          type: "ANALYST",
          hashPassword: firstUserHashPasword,
        },
      },
    },
    include: { users: true },
  });

  delete createdTenant.users[0].hashPassword;

  return createdTenant;
};

export const tenantService = {
  createTenant,
};

export {
  ensureTenantExists
}
