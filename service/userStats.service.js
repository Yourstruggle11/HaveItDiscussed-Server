import ErrorHandler from '../middlewares/ErrorClass.js'
import CommentModel from '../model/comments.model.js'
import questionModel from '../model/question.model.js'
import mongoose from 'mongoose'

/**
 * @param {string} userId
 * @returns {string} totalLikes
 */
export const getUserTotalLikes = async (userId) => {
    try {
        const questionLikes = await questionModel.aggregate([
            { $match: { postedBy: mongoose.Types.ObjectId(userId) } },
            { $group: { _id: null, totalLikes: { $sum: '$likeCount' } } }
        ])

        const commentLikes = await CommentModel.aggregate([
            { $match: { commentedBy: mongoose.Types.ObjectId(userId) } },
            { $group: { _id: null, totalLikes: { $sum: '$likeCount' } } }
        ])

        const totalLikes =
            (questionLikes[0]?.totalLikes || 0) + (commentLikes[0]?.totalLikes || 0)

        return totalLikes
    } catch (error) {
        throw ErrorHandler.badRequestError(error.message)
    }
}

/**
 * @param {string} userId
 * @returns {string} totalComments
 */
export const getUserTotalComments = async (userId) => {
    try {
        const totalComments = await questionModel.aggregate([
            { $match: { postedBy: mongoose.Types.ObjectId(userId) } },
            {
                $lookup: {
                    from: 'comments',
                    localField: '_id',
                    foreignField: 'question',
                    as: 'questionComments'
                }
            },
            { $unwind: '$questionComments' },
            {
                $match: {
                    'questionComments.commentedBy': {
                        $ne: mongoose.Types.ObjectId(userId)
                    }
                }
            },
            { $group: { _id: null, totalComments: { $sum: 1 } } }
        ])

        const count = totalComments[0]?.totalComments || 0

        return count
    } catch (error) {
        throw ErrorHandler.badRequestError(error.message)
    }
}
