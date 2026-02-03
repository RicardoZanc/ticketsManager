import { Router } from "express";
import { authController } from "./authController";
import '../strategies/local-strategy'
import passport from "passport";

const authRouter =  Router();

authRouter.post('/signup', authController.signup)

authRouter.post('/login', passport.authenticate('local'), (req, res)=>res.send({logged: true}))

export default authRouter;
