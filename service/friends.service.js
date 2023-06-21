import ErrorHandler from '../middlewares/ErrorClass.js'
import UserModel from '../model/user.model.js'
import FriendModel from '../model/friends.model.js'
import { AddNotification } from './notifications.service.js'

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

        // Send notification to the recipient
        await AddNotification({
            sender: senderId,
            recipient: recipientId,
            type: 1,
            message: `${sender.name} sent you a friend request`,
            actionURL: `/users/${sender.userNo}/${sender.userName}`,
            anyActionNeeded: true,
            isGeneralNotification: false
        })

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

        const [_, recipient] = await Promise.all([
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

        // Send notification to the friend request sender
        await AddNotification({
            sender: recipientId, //* because the sender (Who initiates this notification) is the recipient of the friend request
            recipient: senderId, //* because the recipient (Who receives this notification) is the sender of the friend request
            type: 2,
            message: `${recipient.name} accepted your friend request`,
            actionURL: `/users/${recipient.userNo}/${recipient.userName}`,
            anyActionNeeded: true,
            isGeneralNotification: false
        })

        return friendRequest
    } catch (error) {
        throw ErrorHandler.badRequestError(error.message)
    }
}

/**
 * @param {string} userId
 * @param {string} friendId
 * @returns {Promise<FriendModel>}
 */
export const removeFriend = async (userId, friendId) => {
    try {
        const [user, friend] = await Promise.all([
            UserModel.findByIdAndUpdate(
                userId,
                { $pull: { friendList: friendId } },
                { new: true }
            ),
            UserModel.findByIdAndUpdate(
                friendId,
                { $pull: { friendList: userId } },
                { new: true }
            )
        ])

        if (!user || !friend) {
            throw ErrorHandler.notFoundError('User or friend not found')
        }

        const removedFromFriendList = await FriendModel.findOneAndDelete({
            $or: [
                { sender: userId, recipient: friendId },
                { sender: friendId, recipient: userId }
            ],
            status: 'accepted'
        })

        if (!removedFromFriendList) {
            throw ErrorHandler.notFoundError('You are not friends with this user')
        }

        return removedFromFriendList
    } catch (error) {
        throw ErrorHandler.badRequestError(error.message)
    }
}
