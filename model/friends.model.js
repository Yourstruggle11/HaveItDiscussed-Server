import mongoose from 'mongoose'

const friendsSchema = new mongoose.Schema(
  {
    sender: {
      type: mongoose.Types.ObjectId,
      ref: 'User',
    },
    recipient: {
      type: mongoose.Types.ObjectId,
      ref: 'User',
    },
    status: {
      type: String,
      enum: ['pending', 'accepted'],
      default: 'pending',
    },
  },
  { timestamps: true }
)

const FriendModel = mongoose.model('Friend', friendsSchema)

export default FriendModel
