import { type_user } from "../../../lib/prisma/generated/enums";
import { baseDTO } from "../../../types/baseDTO";

interface createTenantDTO {
            name: string,
            cnpj: string,
            firstUser: firstUserDTO
        }

interface firstUserDTO {
        name: string,
        email: string,
        password: string,
        confirmPassword: string
}

interface ResponseTenant {
    cnpj: string;
    id: string;
    name: string;
    users: {
        id: string;
        name: string;
        type: type_user;
        email: string;
        hashPassword?: string;
        isAdmin: boolean;
        tenant_id: string;
    }[]
}

export {
        createTenantDTO,
        firstUserDTO,
        ResponseTenant
}