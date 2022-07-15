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