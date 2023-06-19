import ErrorHandler from '../middlewares/ErrorClass.js'
import questionModel from '../model/question.model.js'
import CommentModel from '../model/comments.model.js'
import UserModel from '../model/user.model.js'
import mongoose from 'mongoose'
import { userStatsService } from './index.js'

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
 * @returns {Promise<UserModel>}
 */
export const getUserDetailsByUserNameAndNo = async (userName, userNo) => {
    try {
        // Get user details by user name and user no
        const user = await UserModel.findOne(
            { userName, userNo },
            { __v: 0, updatedAt: 0 }
        )
        if (!user) {
            throw ErrorHandler.notFoundError('User not found')
        }

        // Get total likes of user
        const totalLikes = await userStatsService.getUserTotalLikes(user._id)

        // Get total comments of user
        const totalComments = await userStatsService.getUserTotalComments(user._id)

        return { user, totalLikes, totalComments }
    } catch (error) {
        throw ErrorHandler.badRequestError(error.message)
    }
}
