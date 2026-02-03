import { Request, Response } from "express";
import { userSchema } from "./requestValidations";
import validateRequest from "../helpers/validateRequest";
import { createUserDTO } from "./userDTO";
import { authService } from "./authService";

export const authController = {
    signup: async (req: Request<{}, {}, createUserDTO>, res: Response) => {
       const result = await validateRequest(req, userSchema.signup)

        if(!result.isEmpty()){
            return res.send(result.mapped())
        }

        const user: createUserDTO = req.body;

        try{
            await authService.createUser(user)
        }catch(error: any){
            if(error.status){
                return res.status(error.status).send(error.message)
            }
            res.send(error.message)
        }


        return res.send('ok')

    }
}