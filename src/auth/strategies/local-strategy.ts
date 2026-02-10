import passport from "passport";
import { Strategy } from "passport-local";

passport.use(new Strategy({}, (email, password, done)=>{}))