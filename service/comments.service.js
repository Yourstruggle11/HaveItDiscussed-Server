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


/**
 *
 * @param {string} slug, _id
 * @returns {Promise<CommentModel>}
 */
 export const likeSingleComment = async (slug, _id) => {
    // Finding comment
    const comment = await  CommentModel(slug)
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
          message: 'Comment unliked successful!',
          likes: `${comment.likeCount}`
        }
      } else {
        // increase the Like count of the comment
        comment.likeCount++
        // Add user to the array
        comment.likedBy.push(_id)
        const saveLike = await comment.save()
        return {
          saveLike,
          message: 'Comment liked successful!',
          likes: `${comment.likeCount}`
        }
      }
    } else {
      const err = new Error('No comment found');
      err.status = 404;
      throw err
    }
  }