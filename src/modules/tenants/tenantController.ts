import { Request, Response } from "express"
import { tenantSchema } from "./requestValidations"
import validateRequest from "../../helpers/validateRequest"
import { tenantService } from "./tenantService"
import { createTenantDTO } from "./tenantDTO"

const createTenant = async (req: Request, res: Response) => {
  const  {result, data} =  await validateRequest(req, tenantSchema.createTenant)

  if (!result.isEmpty()) {
        return res.status(400).send(result.mapped())
    }

    try{
        const createdTenant = await tenantService.createTenant(data as createTenantDTO)
        return res.status(201).send(createdTenant)
    }catch(error: any){
        if(error.status){
            return res.status(error.status).send({error: error.message})
        }
        return res.status(500).send({error: error.message})
    }
    
}

export const tenantController = {
    createTenant
}

