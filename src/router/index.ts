import { Router } from "express";
import authRouter from "../auth/authRouter";
import tenantRouter from "../modules/tenants/tenantRouter";

const apiRouter = Router()

apiRouter.use('/auth', authRouter)
apiRouter.use('/tenant', tenantRouter)

export default apiRouter;