import mongoose from 'mongoose'


const postSchema = mongoose.Schema({
    title: String,
    message: String,
    creator: String,
    category: String,
    selectedFile: String,

    likeCount: {
        type: Number,
        default: 0
    },
    dislikeCount: {
        type: Number,
        default: 0
    },
    createdAt: {
        type: Date,
        default: new Date()
    },
    response:
        [{ type: mongoose.Schema.Types.ObjectId, ref: "Response" }]

})



const PostMessage = mongoose.model('PostMessage', postSchema)

export default PostMessage;