import { Request, Response } from "express"
import { requestSchemas } from "../validations/requestSchemas"
import validateRequest from "../../../helpers/validateRequest"
import { tenantService } from "../services/tenantService"
import { createTenantDTO } from "../types/tenantDTO"

const createTenant = async (req: Request<{}, {}, createTenantDTO>, res: Response) => {
    const tenant =  await validateRequest(req, requestSchemas.createTenant)
    const createdTenant = await tenantService.createTenant(tenant)
    return res.status(201).send(createdTenant)
}

export const tenantController = {
    createTenant
}

