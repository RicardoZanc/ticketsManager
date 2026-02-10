import passport from "passport";
import { Strategy } from "passport-local";
import prisma from "../../lib/prisma";
import { User } from "../../lib/prisma/generated/client";
import ServiceError from "../../errors/serviceError";
import { passwordHelper } from "../../helpers/passwordHelper";

passport.use(new Strategy({}, (email, password, done)=>{}))