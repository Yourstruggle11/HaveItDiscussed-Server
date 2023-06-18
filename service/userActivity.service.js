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
            throw ErrorHandler.notFoundError('User not found');
        }

        return updateProfile;
    } catch (error) {
        throw ErrorHandler.badRequestError(error.message);
    }
}
