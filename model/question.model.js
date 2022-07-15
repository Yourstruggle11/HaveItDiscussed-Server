import mongoose from 'mongoose'
import slugify from 'slugify'


const questionSchema = new mongoose.Schema({
    questionTitle:{
        type:String,
        required:true
    },
    questionSlug:{
        type: String,
        trim: true
    },
    questionBody:{
        type:String,
        required:true
    },
    postedBy:{
        type:mongoose.Types.ObjectId,
        ref:'User',
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
      keywords: [String],
},
{ timestamps: true }
)


courseSchema.pre('validate', function (next) {
    if (this.questionTitle) {
        this.questionSlug = slugify(this.questionTitle, {
            lower: true,
            strict: true,
            replacement: '_'
        })
    }
    next()
})

const questionModel = mongoose.model('Question', questionSchema);

export default questionModel;