import { Request, Response } from "express";
import { userSchema } from "./requestValidations";
import validateRequest from "../helpers/validateRequest";
import { CreateUserDTO, loginDTO, UserResponse } from "./userDTO";
import { authService } from "./authService";
import "../strategies/local-strategy";
import passport from "passport";

export const authController = {
  signup: async (req: Request<{}, {}, CreateUserDTO>, res: Response) => {
    const result = await validateRequest(req, userSchema.signup);

    if (!result.isEmpty()) {
      return res.status(400).send(result.mapped());
    }

    const user: CreateUserDTO = req.body;

    try {
      const createdUser: UserResponse = await authService.createUser(user);
      return res.status(201).send(createdUser);
    } catch (error: any) {
      if (error.status) {
        return res.status(error.status).send(error.message);
      }
      res.send(error.message);
    }
  },

  login: async (req: Request<{}, {}, loginDTO>, res: Response) => {
    const passportLogin = passport.authenticate(
      "local",
      (error: any, user: Express.User) => {
        if (error) {
          return res.send(error.message);
        }
        if (!user) {
          return res.status(400).send("User must be informed");
        }

        req.login(user, () =>
          res.status(200).send("User loged in successfully"),
        );
      },
    );

    passportLogin(req, res);
  },
};
