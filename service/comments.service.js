import commentModel from "../model/comments.model";

/**
 *
 * @param {string} comment,commentedBy,questionId
 * @returns {Promise<commentModel>}
 */
 export const createComment = async (comment,commentedBy,questionId) => {
    const comment = new commentModel({
        comment,
        commentedBy,
        question:questionId
      })
      await comment.save();
      return comment
}