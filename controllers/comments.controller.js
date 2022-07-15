import { commentsService } from '../service/index.js';
import { catchAsync } from '../utils/catchAsync.js';

/**
 * @description Post a new comment
 * @route POST /comments/:questionId/create
 * @access Private
 */
export const addNewComment = catchAsync(async (req, res, next) => {
  const { comment } = req.body
  const { _id:commentedBy } = req.user
  const { questionId } = req.params

  const newComment = await commentsService.createComment(comment,commentedBy,questionId)
  return res.status(201).json({
    success: true,
    message: 'Comment created successful !',
    body: newComment
  })
})


/**
 * @description Get all comments of a single question
 * @route GET /comments/:questionId
 * @access Private
 */
export const getAllCommentsOfAQuestion = catchAsync(async (req, res, next) => {
  // finding blogs
  const {questionId} = req.params
  const comments = await commentsService.getComments(questionId)
  return res.status(200).json({
    success: true,
    message: 'Comments fetch successful !',
    body: comments
  })
})