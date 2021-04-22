import mongoose from 'mongoose'

const imageSchema = mongoose.Schema({
    selectedFile: String
})

const Image = mongoose.model('Image', imageSchema)

export default Image;