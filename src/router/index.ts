import { Router } from "express";
import authRouter from "../auth/routes/authRouter";
import tenantRouter from "../modules/tenants/routes/tenantRouter";

const apiRouter = Router()

apiRouter.use('/auth', authRouter)
apiRouter.use('/tenant', tenantRouter)

export default apiRouter;