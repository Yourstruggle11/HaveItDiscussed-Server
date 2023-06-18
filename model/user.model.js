import mongoose from 'mongoose'

const userSchema = new mongoose.Schema(
    {
        name: String,
        email: {
            type: String,
            unique: true
        },
        location: String,
        position: String,
        userName: String,
        userNo: Number,
        profilePic: String,
        university: String,
        bio: String,
        registerDate: {
            type: Date,
            default: Date.now
        }
    },
    { timestamps: true }
)
const UserModel = mongoose.model('User', userSchema)

export default UserModel
