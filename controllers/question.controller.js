import { questionService } from '../service/index.js';
import { catchAsync } from '../utils/catchAsync.js';

/**
 * @description Post a new question
 * @route POST /discussion/new
 * @access Public
 */
export const addNewQuestion = catchAsync(async (req, res, next) => {
  // idToken comes from the client app
  const { questionTitle,questionBody } = req.body
  const { _id:postedBy } = req.user

  const data = await questionService.postNewQuestion(questionTitle,questionBody,postedBy);
  return res.status(200).json({
    success: true,
    message: 'Question posted successfully',
    data: data
  })
})