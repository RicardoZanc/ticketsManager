import { Router } from "express";
import { tenantController } from "./tenantController";

const tenantRouter = Router()

tenantRouter.post('/', tenantController.createTenant)

export default tenantRouter;