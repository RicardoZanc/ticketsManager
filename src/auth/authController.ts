import { Request, Response } from "express";
import { userSchema } from "./requestValidations";
import validateRequest from "../helpers/validateRequest";
import { CreateUserDTO, UserResponse } from "./userDTO";
import { authService } from "./authService";

export const authController = {
    signup: async (req: Request<{}, {}, CreateUserDTO>, res: Response) => {
       const result = await validateRequest(req, userSchema.signup)

        if(!result.isEmpty()){
            return res.status(400).send(result.mapped())
        }

        const user: CreateUserDTO = req.body;

        try{
            const createdUser: UserResponse = await authService.createUser(user)
            return res.status(201).send(createdUser)
        }catch(error: any){
            if(error.status){
                return res.status(error.status).send(error.message)
            }
            res.send(error.message)
        }
    }
}