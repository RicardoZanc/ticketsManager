import express from 'express'
import 'dotenv/config'
import session from 'express-session'
import passport from 'passport'
import { getTime } from './helpers/timeHelpers'
import apiRouter from './router'
import { MongoStore } from 'connect-mongo'


const SESSION_SECRET = process.env.SESSION_SECRET
const mongoUrl = process.env.MONGO_URL

if(!SESSION_SECRET){
    throw Error('No session secret defined')
}


const app = express()

app.use(express.json())
app.use(session({
    secret: SESSION_SECRET,
    cookie: {
        maxAge: getTime.inHours(2)
    },
    saveUninitialized: false,
    resave: false,
    store: MongoStore.create( {mongoUrl} )

}))


app.use(passport.initialize())
app.use(passport.session())

app.use('/api', (req, res, next)=>{console.log('Chamando api router'); next()}, apiRouter)
app.use('/health', (req, res)=>{
    res.send('Ok')
})

const PORT = process.env.PORT || 3000


app.listen(PORT, ()=>{
    console.log('Running in port: ', PORT)
})