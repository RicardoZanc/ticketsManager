import { Router } from "express";
import { tenantController } from "../controllers/tenantController";

const tenantRouter = Router()

tenantRouter.post('/', tenantController.createTenant)

export default tenantRouter;