import CommentModel from "../model/comments.model.js";

/**
 *
 * @param {string} comment,commentedBy,questionId
 * @returns {Promise<CommentModel>}
 */
 export const createComment = async (comment,commentedBy,questionId) => {
    const newComment = new CommentModel({
        comment,
        commentedBy,
        question:questionId
      })
      await newComment.save();
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
      .populate('user')
      .sort({ updatedAt: -1 })
    return comments
}