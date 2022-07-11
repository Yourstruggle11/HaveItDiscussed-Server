import mongoose from 'mongoose'

const userSchema = new mongoose.Schema(
  {
    name: String,
    email: {
      type: String,
      unique: true
    },
    profilePic: String,
    registerDate: {
      type: Date,
      default: Date.now
    }
  },
  { timestamps: true }
)
const UserModel = mongoose.model('User', userSchema)

export default UserModel
