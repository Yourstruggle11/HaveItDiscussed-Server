import ErrorHandler from '../middlewares/ErrorClass.js'
import UserModel from '../model/user.model.js'
import { userStatsService } from './index.js'
import FriendModel from '../model/friends.model.js'

/**
 * @param {string} userId
 * @param {object} body
 * @returns {Promise<UserModel>}
 */
export const updateProfile = async (userId, body) => {
    try {
        const {
            name = undefined,
            position = undefined,
            location = undefined,
            profilePic = undefined,
            university = undefined,
            bio = undefined
        } = body

        const updatedFields = {
            ...(name && { name }),
            ...(position && { position }),
            ...(location && { location }),
            ...(profilePic && { profilePic }),
            ...(university && { university }),
            ...(bio && { bio })
        }

        const updatedUser = await UserModel.findByIdAndUpdate(
            userId,
            updatedFields,
            { new: true }
        )
        if (!updatedUser) {
            throw ErrorHandler.notFoundError('User not found')
        }

        return updatedUser
    } catch (error) {
        throw ErrorHandler.badRequestError(error.message)
    }
}

/**
 * @param {string} userName
 * @param {string} userNo
 * @param {string} viewerId
 * @returns {Promise<UserDetails>}
 */
export const getUserDetailsByUserNameAndNo = async (userName, userNo, viewerId) => {
    try {
        const user = await UserModel.findOne(
            { userName, userNo },
            { __v: 0, updagetUserDetailstedAt: 0 }
        )

        if (!user) {
            throw ErrorHandler.notFoundError('User not found')
        }

        const userDetails = user.toObject()

        if (viewerId !== 'undefined') {
            const isFriend = await FriendModel.exists({
                $or: [
                    {
                        sender: viewerId,
                        recipient: userDetails._id
                    },
                    {
                        sender: userDetails._id,
                        recipient: viewerId
                    }
                ],
                status: 'accepted'
            })

            userDetails.isFriend = !!isFriend

            const [isPending, isFriendRequestReceived] = await Promise.all([
                FriendModel.exists({
                    sender: viewerId,
                    recipient: userDetails._id,
                    status: 'pending'
                }),
                FriendModel.exists({
                    sender: userDetails._id,
                    recipient: viewerId,
                    status: 'pending'
                })
            ])

            userDetails.isPending = !!isPending
            userDetails.isFriendRequestReceived = !!isFriendRequestReceived
        }

        const totalLikes = await userStatsService.getUserTotalLikes(userDetails._id)
        const totalComments = await userStatsService.getUserTotalComments(
            userDetails._id
        )

        return { userDetails, totalLikes, totalComments }
    } catch (error) {
        throw ErrorHandler.badRequestError(error.message)
    }
}
