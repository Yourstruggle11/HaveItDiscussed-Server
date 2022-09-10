import { commentsService } from '../service/index.js'
import { catchAsync } from '../utils/catchAsync.js'

/**
 * @description Post a new comment
 * @route POST /comments/:questionId/create
 * @access private
 */
export const addNewComment = catchAsync(async (req, res, next) => {
    const { comment } = req.body
    const { id: commentedBy } = req.user
    const { questionId } = req.params

    const newComment = await commentsService.createComment(
        comment,
        commentedBy,
        questionId
    )
    return res.status(201).json({
        success: true,
        message: 'Comment created successful !',
        body: newComment
    })
})

/**
 * @description Get all comments of a single question
 * @route GET /comments/:questionId
 * @access public
 */
export const getAllCommentsOfAQuestion = catchAsync(async (req, res, next) => {
    // finding question
    const { questionId } = req.params
    const comments = await commentsService.getComments(questionId)
    return res.status(200).json({
        success: true,
        message: 'Comments fetch successful!',
        body: comments
    })
})

/**
 * @description Like a comment by user if user is authenticated
 *              If the comment is already liked, unlike the comment from the user
 * @routes PUT/comments/like-dislike/:slug
 * @access Restricted on user login
 */
export const likeDislikeToggle = catchAsync(async (req, res, next) => {
    const { commentId } = req.params
    const { id } = req.user
    const { saveLike, message, likes } = await commentsService.likeSingleComment(
        commentId,
        id
    )
    return res.json({
        success: true,
        message: message,
        totalLikes: likes,
        body: saveLike
    })
})
