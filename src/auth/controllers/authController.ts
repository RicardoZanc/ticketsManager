import { Request, Response } from "express";
import { CreateUserDTO, loginDTO } from "../types/userDTO";
import "../strategies/local-strategy";
import passport from "passport";
import validateRequest from "../../helpers/validateRequest";
import { userSchema } from "../validations/requestSchemas";
import { authService } from "../services/authService";

export const authController = {
  signup: async (req: Request<{}, {}, CreateUserDTO>, res: Response) => {
    const user =  await validateRequest<CreateUserDTO>(req, userSchema.signup)

    await authService.createUser(user);

    res.status(201).send({
      CretedUser: user
    })

  },

  login: async (req: Request<{}, {}, loginDTO>, res: Response) => {
    const passportLogin = passport.authenticate(
      "local",
      (error: any, user: Express.User) => {
        req.login(user, () =>
          res.status(200).send("User loged in successfully"),
        );
      },
    );

    passportLogin(req, res);
  },
};
