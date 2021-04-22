import mongoose from 'mongoose'

const responseSchema = mongoose.Schema({
    responseContent: String,
    creator: String
})

const Response = mongoose.model('Response', responseSchema)

export default Response;