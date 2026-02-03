import passport from "passport";
import { Strategy } from "passport-local";
import prisma from "../lib/prisma";
import { User } from "../lib/prisma/generated/client";
import ServiceError from "../errors/serviceError";
import { passwordHelper } from "../helpers/passwordHelper";

passport.use(new Strategy(
    {usernameField: 'email'},
    async (email, password, done)=>{
        try{
            const user: User | null = await  prisma.user.findUnique({where: {email}}) 
            if(!user){
                return done(new ServiceError('User no found', 406), false)
            }

            if(!passwordHelper.compare(password, user.hashPassword)){
                return done(new ServiceError('Invalid credentials', 400), false)
            }

            return done(null, user)
        }catch(error){
            return done(error, false)
        }

    }
))

passport.serializeUser((user: any, done)=>{
    done(false, user.id)
})

passport.deserializeUser(async (id: string, done)=>{
    try{
        const user = await prisma.user.findUnique({where: {id}})
        if(!user){
            return done(new ServiceError('User not found', 404))     
        }
        return done(null, user)
    }catch(error){
        return done(error)
    }

})