import ErrorHandler from '../middlewares/ErrorClass.js'
import UserModel from '../model/user.model.js'
import FriendModel from '../model/friends.model.js'

/**
 * @param {string} senderId
 * @param {string} recipientId
 * @returns {Promise<FriendModel>}
 */
export const addFriend = async (senderId, recipientId) => {
    try {
        const sender = await UserModel.findById(senderId)
        const recipient = await UserModel.findById(recipientId)

        if (!sender || !recipient) {
            throw ErrorHandler.notFoundError('Sender or recipient user not found')
        }

        const existingRequest = await FriendModel.findOne({
            $or: [
                { sender: senderId, recipient: recipientId },
                { sender: recipientId, recipient: senderId }
            ]
        })

        if (existingRequest) {
            let errorMessage = 'Friend request already sent'

            if (existingRequest.sender.toString() === recipientId) {
                errorMessage =
                    'You have already received a friend request from this user'
            }

            throw ErrorHandler.conflictError(errorMessage)
        }

        const friendRequest = new FriendModel({
            sender: senderId,
            recipient: recipientId,
            status: 'pending'
        })

        await friendRequest.save()

        return friendRequest
    } catch (error) {
        throw ErrorHandler.badRequestError(error.message)
    }
}

/**
 * @param {string} senderId
 * @param {string} recipientId
 * @returns {Promise<FriendModel>}
 */
export const cancelFriendRequest = async (senderId, recipientId) => {
    try {
        const friendRequest = await FriendModel.findOneAndDelete({
            $or: [
                { sender: senderId, recipient: recipientId },
                { sender: recipientId, recipient: senderId }
            ],
            status: 'pending'
        })

        if (!friendRequest) {
            throw ErrorHandler.notFoundError('Friend request not found')
        }

        let message = ''

        if (friendRequest.sender.toString() === senderId) {
            message = 'Firiend request cancelled successfully'
        } else if (friendRequest.sender.toString() === recipientId) {
            message = 'Friend request rejected successfully'
        }

        return { message, friendRequest }
    } catch (error) {
        throw ErrorHandler.badRequestError(error.message)
    }
}

/**
 * @param {string} senderId
 * @param {string} recipientId
 * @returns {Promise<FriendModel>}
 */
export const acceptFriendRequest = async (senderId, recipientId) => {
    try {
        const friendRequest = await FriendModel.findOneAndUpdate(
            {
                sender: senderId,
                recipient: recipientId,
                status: 'pending'
            },
            { status: 'accepted' },
            { new: true }
        )

        if (!friendRequest) {
            throw ErrorHandler.notFoundError('Friend request not found')
        }

        await Promise.all([
            UserModel.findByIdAndUpdate(
                senderId,
                { $push: { friendList: recipientId } },
                { new: true }
            ),
            UserModel.findByIdAndUpdate(
                recipientId,
                { $push: { friendList: senderId } },
                { new: true }
            )
        ])

        return friendRequest
    } catch (error) {
        throw ErrorHandler.badRequestError(error.message)
    }
}
