import mongoose from 'mongoose'

const userSchema = mongoose.Schema({
    username: { type: String, unique: true },
    password: String,
    level: {
        type: Number,
        default: 1
    },
    icon: { type: String, default: '' },
    joinedAt: { type: Date, default: new Date() }
})

const User = mongoose.model('User', userSchema)

export default User;