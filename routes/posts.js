import express from 'express'
import PostMessage from '../models/postMessage.js'
import Category from '../models/category.js'
import Response from '../models/response.js'
import mongodb from 'mongodb'


const router = express.Router()
const ObjectId = mongodb.ObjectID

router.get('/', async (req, res) => {
    try {
        const postMessages = await PostMessage.find()
        res.status(200).json(postMessages)

    } catch (err) {
        res.status(404).json({ message: err.message })
    }
})


router.post('/post', async (req, res) => {
    const id = req.body.user.id
    console.log(id)
    try {
        const postMessage = await PostMessage.find({ _id: id })
        console.log(postMessage)
        res.status(200).json(postMessage)

    } catch (err) {
        res.status(404).json({ message: err.message })
    }
})


router.get('/response', async (req, res) => {
    try {
        const responses = await Response.find()
        res.status(200).json(responses)

    } catch (err) {
        res.status(404).json({ message: err.message })
    }
})


router.post('/response', async (req, res) => {
    const response = req.body.response
    const newResponse = new Response(response)

    try {
        await newResponse.save()

        await PostMessage.findOne({ "_id": ObjectId(response.id) }, (err, matchedPost) => {
            if (matchedPost) {
                console.log(matchedPost)
                matchedPost.response.push(newResponse)
                matchedPost.save()
            }
        })
        const postMessage = await PostMessage.find({ "_id": ObjectId(response.id) })
        res.status(201).json(postMessage)

    } catch (err) {
        res.status(409).json({ message: err.message })
    }
})


router.patch('/like', async (req, res) => {
    const username = req.body.data.username
    const id = req.body.data.id
    console.log(id)
    console.log(username)
    try {
        await PostMessage.findOne({ "_id": ObjectId(id) }, (err, matchedPost) => {
            if (matchedPost.likeCount.includes(username)) {
                matchedPost.likeCount.splice(matchedPost.likeCount.indexOf(username), 1)
            } else {
                matchedPost.likeCount.push(username)
            }
            matchedPost.save()
            res.status(200).json(matchedPost)
        })
    } catch (err) {
        req.json({ message: err })
    }
})

router.patch('/dislike', async (req, res) => {
    const username = req.body.data.username
    const id = req.body.data.id
    console.log(id)
    console.log(username)
    try {
        await PostMessage.findOne({ "_id": ObjectId(id) }, (err, matchedPost) => {
            if (matchedPost.dislikeCount.includes(username)) {
                matchedPost.dislikeCount.splice(matchedPost.dislikeCount.indexOf(username), 1)
            } else {
                matchedPost.dislikeCount.push(username)
            }
            matchedPost.save()
            res.status(200).json(matchedPost)
        })
    } catch (err) {
        req.json({ message: err })
    }
})

router.post('/', async (req, res) => {
    const post = req.body.newPost
    console.log(post)
    const newPost = new PostMessage(post)

    console.log(newPost)
    try {
        await newPost.save()

        await Category.findOne({ category: newPost.category }, (err, matchedCategory) => {
            if (matchedCategory) {
                console.log(matchedCategory)
                matchedCategory.posts.push(newPost)
                matchedCategory.save()

                res.status(201).json(newPost)
            }
        })
    } catch (err) {
        res.status(409).json({ message: err.message })
    }
})


export default router