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


/**
 * @description Get all available questions from DB
 * @route GET /discussion/get-all-questions?search=&page=&limit=
 * @access Public
* @property search, page and Limits are optional
* @property page is the start count of blogs to view.
* @property limit is the number of blogs to view.
* @property search is the query string to search blogs.
*
* @summary error handling for search, page and limit as if they are not provided we will return all the blogs present in database
*/
export const getAllQuestions = catchAsync(async (req, res, next) => {
    const { search, page, limit } = req.query

  const {totalQuestions,questions} = await questionService.getAllQuestions(search, page, limit );
  return res.status(200).json({
    success: true,
    message: 'Questions fetched successfully',
    totalQuestions,
    questions
  })
})