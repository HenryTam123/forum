import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors'
import postRoutes from './routes/posts.js'
import categoryRoutes from './routes/categories.js'
import Category from './models/category.js'
import User from './models/User.js'
import Image from './models/image.js'
import dotenv from 'dotenv'
import cookieParser from 'cookie-parser'
import session from 'cookie-session'
import connectMongo from 'connect-mongo'


const app = express()

const corsOptions = {
    origin: 'https://elated-visvesvaraya-dab635.netlify.app',
    optionsSuccess: 200,
    credentials: true,
}

app.use(express.json())
app.use(express.urlencoded({ limit: "30mb", extended: true }))
app.options('*', cors(corsOptions))
app.use(cors(corsOptions))
app.use(cookieParser())
const MongoStore = connectMongo(session);
let store = new MongoStore({
    mongooseConnection: mongoose.connection
});
// const store = new session.MemoryStore()
app.set('trust proxy', 1)
app.enable('trust proxy')
app.use(session({
    secret: 'secret',
    resave: false,
    saveUninitialized: true,
    proxy: true,
    cookie: { sameSite: 'none', maxAge: 600000, secure: true },
    store
}))
dotenv.config()

app.use('/posts', postRoutes)
app.use('/categories', categoryRoutes)

app.post("/uploadphoto", async (req, res) => {
    const selectedFile = req.body
    const newFile = new Image(selectedFile)
    try {
        newFile.save()
        res.status(201).json(newFile)
    } catch (err) {
        res.status(409).json({ message: err.message })
    }
})


app.post('/register', async (req, res) => {
    const user = req.body
    const newUser = new User(user)
    const user2 = await User.findOne({ username: req.body.username })
    console.log(user)
    if (user2) {
        res.json({ success: 'false', message: 'This usernmae has been used ' })
    } else {
        newUser.save()
            .then(data => {
                res.json({ success: 'true', message: "This username is available" })
            })
            .catch(err => {
                res.json({ message: err })
            })
    }
})

app.post('/login', async (req, res) => {
    const user = new User({
        username: req.body.username,
        password: req.body.password,
    })
    const user2 = await User.findOne({ username: req.body.username })
    console.log(req.sessionID)
    console.log(user)
    try {
        if (user.username && user.password) {
            if (req.session.authenticated) {
                res.json(req.session)
            } else {
                if (user2) {
                    if (req.body.password === user2.password) {
                        req.session.authenticated = true
                        req.session.user = user
                        res.cookie('sessionID', req.session.id)
                        res.json(req.session)

                    } else {
                        res.json({ message: "Incorrect Username or Password" })
                    }
                } else {
                    res.json({ message: "Incorrect Username or Password" })
                }
            }
        } else {
            res.json({ msg: 'bad credentials' })
        }
    } catch (err) {
        console.log(err)
    }
})

function validateCookie(req, res, next) {
    const { cookies } = req;
    if ('sessionID' in cookies) {
        if (cookies.sessionID === req.sessionID) {
            next()
        }
    }
}

app.get('/autologin', validateCookie, async (req, res) => {
    const user2 = await User.findOne({ username: req.session.user.username })
    console.log('autologin')
    res.json(user2)
})

app.delete('/logout', (req, res) => {
    req.session.destroy()
    console.log('logout')
    res.json({ message: "logout" })
})

app.get('/users', async (req, res) => {
    try {
        const users = await User.find()
        res.status(200).json(users)

    } catch (err) {
        res.status(404).json({ message: err.message })
    }
})


const PORT = process.env.PORT || 5000

mongoose.connect(process.env.CONNECTION_URL, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => app.listen(PORT, () => console.log(`server running on port ${PORT}`)))
    .catch((err) => console.log(err.message))

mongoose.set('useFindAndModify', false)

