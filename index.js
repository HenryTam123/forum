import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors'
import postRoutes from './routes/posts.js'
import categoryRoutes from './routes/categories.js'

import User from './models/User.js'
import Image from './models/image.js'
import dotenv from 'dotenv'
import cookieParser from 'cookie-parser'

import bcrypt from "bcrypt";


const app = express()

// const corsOptions = {
//     origin: ['https://tjhkg-forum-alpha.netlify.app', 'https://henrytam123.github.io/'],
//     origin: 'http://localhost:3000',
//     optionsSuccess: 200,
//     credentials: true,
// }
const allowedOrigins = ['https://tjhkg-forum-alpha.netlify.app', 'https://henrytam123.github.io', 'http://localhost:3000']
const corsOptions = {
    origin: function (origin, callback) {
        if (allowedOrigins.indexOf(origin) !== -1) {
            callback(null, true)
        } else {
            callback(new Error('Not allowed by CORS'))
        }
    },
    credentials: true,
}

app.use(express.json())
app.use(express.urlencoded({ limit: "30mb", extended: true }))
app.options('*', cors(corsOptions))
app.use(cors(corsOptions))
app.use(cookieParser())

// const store = new session.MemoryStore()

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

        const salt = await bcrypt.genSalt(10);

        newUser.password = await bcrypt.hash(user.password, salt)

        console.log(newUser.password)

        newUser.save()
            .then(data => {
                res.json({ success: 'true', message: "This username is available", ...data })
            })
            .catch(err => {
                res.json({ message: err })
            })
    }
})

app.post('/login', async (req, res) => {
    const { username, password } = req.body;

    const user = await User.findOne({ username: username })

    if (!!user) {
        const validPassword = await bcrypt.compare(password, user.password)

        if (validPassword) {
            res.status(200).send(user)
        } else {
            res.status(400).json({ message: "Invalid Password" })
        }

    } else {
        res.json({ message: "Invalid Username or Password" })
    }

})

app.post('/logout', (req, res) => {
    console.log('logout')
    res.json({ message: "logout" })
})

app.get('/users', async (req, res) => {
    try {
        const users = await User.find({}, {
            _id: 0,
            icon: 1,
            username: 1,
            level: 1,
            joinedAt: 1
        })
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

