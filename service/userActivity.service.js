import ErrorHandler from '../middlewares/ErrorClass.js'
import UserModel from '../model/user.model.js'

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

        return updateProfile
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

        return user
    } catch (error) {
        throw ErrorHandler.badRequestError(error.message)
    }
}
