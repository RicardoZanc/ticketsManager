import express from 'express'
import 'dotenv/config'
import session from 'express-session'
import passport from 'passport'
import { getTime } from './helpers/timeHelpers'
import apiRouter from './router'


const SESSION_SECRET = process.env.SESSION_SECRET

if(!SESSION_SECRET){
    throw Error('No session secret defined')
}


const app = express()

app.use(session({
    secret: SESSION_SECRET,
    cookie: {
        maxAge: getTime.inHours(2)
    },
    saveUninitialized: false,
    resave: false
}))


app.use(passport.initialize())
app.use(passport.session())

app.use('/api', apiRouter)

const PORT = process.env.PORT || 3000


app.listen(PORT, ()=>{
    console.log('Running in port: ', PORT)
})