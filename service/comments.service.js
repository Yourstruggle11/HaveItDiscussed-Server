import CommentModel from '../model/comments.model.js'
import questionModel from '../model/question.model.js'
import UserModel from '../model/user.model.js'
import { AddNotification } from './notifications.service.js'

/**
 *
 * @param {string} comment
 * @param {string} commentedBy
 * @param {string} questionId
 * @returns {Promise<CommentModel>}
 */
export const createComment = async (comment, commentedBy, questionId) => {
    const newComment = new CommentModel({
        comment,
        commentedBy,
        question: questionId
    })
    await newComment.save()
    // Find the user who commented
    const sender = await UserModel.findById(commentedBy)
    const question = await questionModel.findById(questionId)

    // Check if the user who commented is not the owner of the question
    if (commentedBy !== question?.postedBy.toString()) {
        await AddNotification({
            sender: commentedBy,
            recipient: question?.postedBy,
            type: 3,
            message: `${sender.name} commented on your question`,
            actionURL: `/question/${question?.questionSlug}`,
            anyActionNeeded: true,
            isGeneralNotification: false
        })
    }

    return newComment
}
/**
 *
 * @param {string} questionId
 * @returns {Promise<CommentModel>}
 */
export const getComments = async (questionId) => {
    // Find all comments of a particular questions and popullate them with user
    const comments = await CommentModel.find({ question: questionId })
        .populate('commentedBy')
        .sort({ updatedAt: -1 })
    return comments
}

/**
 *
 * @param {string} commentId, _id
 * @returns {Promise<CommentModel>}
 */
export const likeSingleComment = async (commentId, _id) => {
    // Finding comment
    const comment = await CommentModel.findOne({ _id: commentId })
    if (comment) {
        // Check if the user who hit the api has already liked the comment post before
        if (comment.likedBy.includes(_id)) {
            // decrease the like count of the comment
            comment.likeCount--
            // Remove user from array
            comment.likedBy.pull(_id)
            const saveLike = await comment.save()
            return {
                saveLike,
                message: 'opps! you disliked the comment👎',
                likes: `${comment.likeCount}`
            }
        } else {
            // increase the Like count of the comment
            comment.likeCount++
            // Add user to the array
            comment.likedBy.push(_id)
            const saveLike = await comment.save()

            // Check if the user who liked the comment is not the owner of the comment
            if (_id !== comment?.commentedBy.toString()) {
                const whoLiked = await UserModel.findById(_id)
                const getQuestionSlug = await questionModel.findById(
                    comment?.question
                )
                await AddNotification({
                    sender: _id,
                    recipient: comment?.commentedBy,
                    type: 5,
                    message: `${whoLiked.name} liked your comment`,
                    actionURL: `/question/${getQuestionSlug?.questionSlug}`,
                    anyActionNeeded: true,
                    isGeneralNotification: false
                })
            }
            return {
                saveLike,
                message: 'Yeah, You Like this comment👍',
                likes: `${comment.likeCount}`
            }
        }
    } else {
        const err = new Error('No comment found')
        err.status = 404
        throw err
    }
}
