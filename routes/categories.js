import express from 'express'
import Category from '../models/category.js'

const router = express.Router()

router.get('/', async (req, res) => {
    try {
        const categories = await Category.find()
        res.status(200).json(categories)

    } catch (err) {
        res.status(404).json({ message: err.message })
    }
})

router.post('/', async (req, res) => {
    const category = req.body
    const newCategory = new Category(category)
    try {
        newCategory.save()
        res.status(201).json(newCategory)
    } catch (err) {
        res.status(409).json({ message: err.message })
    }
})


export default router