import mongoose from 'mongoose'
import slugify from 'slugify'
import { v4 as uuid } from 'uuid'

const questionSchema = new mongoose.Schema(
    {
        questionTitle: {
            type: String,
            required: true
        },
        questionSlug: {
            type: String,
            trim: true
        },
        questionBody: {
            type: String,
            required: true
        },
        postedBy: {
            type: mongoose.Types.ObjectId,
            ref: 'User'
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
        ],
        keywords: [String]
    },
    { timestamps: true }
)

questionSchema.pre('validate', function (next) {
    if (this.questionTitle) {
        const slug = slugify(this.questionTitle, {
            lower: true,
            strict: true,
            replacement: '_'
        })
        this.questionSlug = `${slug}_${uuid().split('-')[0]}`
    }
    next()
})

const questionModel = mongoose.model('Question', questionSchema)

export default questionModel
