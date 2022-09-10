import mongoose from 'mongoose'

const commentSchema = new mongoose.Schema(
    {
        comment: {
            type: String,
            required: true
        },
        commentedBy: {
            type: mongoose.Types.ObjectId,
            ref: 'User'
        },
        question: {
            type: mongoose.Types.ObjectId,
            ref: 'Question'
        },
        likeCount: {
            type: Number,
            default: 0
        },
        likedBy: [
            {
                type: mongoose.Types.ObjectId,
                ref: 'User'
            }
        ]
    },
    { timestamps: true }
)

const commentModel = mongoose.model('Comment', commentSchema)

export default commentModel
