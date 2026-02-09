import { Request, Response } from "express"
import { tenantSchema } from "./requestValidations"
import validateRequest from "../../helpers/validateRequest"

const createTenant = async (req: Request, res: Response) => {
  const  {result, } =  await validateRequest(req, tenantSchema.createTenant)
}

export const tenantController = {

}