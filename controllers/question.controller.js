import { questionService } from '../service/index.js';
import { catchAsync } from '../utils/catchAsync.js';

/**
 * @description Post a new question
 * @route POST /discussion/new
 * @access Public
 */
export const addNewQuestion = catchAsync(async (req, res, next) => {
  // idToken comes from the client app
  const { questionTitle,questionBody,keywords } = req.body
  const { id:postedBy } = req.user

  const data = await questionService.postNewQuestion(questionTitle,questionBody,postedBy,keywords);
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

    // make pre define value if search, page and limit are not provided
    const pageQuery = page || 1
    const limitQuery = limit || 5


  const {totalQuestions,questions} = await questionService.getAllQuestions(search, pageQuery, limitQuery );
  return res.status(200).json({
    success: true,
    message: 'Questions fetched successfully',
    totalQuestions,
    questions
  })
})



/**
 * @description Get single questions from DB
 * @route GET /discussion/get-single-questions/:questionSlug
 * @access Public
 * 
 * */
export const getSingleQuesion = catchAsync(async (req, res, next) => {
    const { questionSlug } = req.params
    const { id } = req.query

  const question = await questionService.getSingleQuestion(questionSlug);
  return res.status(200).json({
    success: true,
    message: 'Question fetched successfully',
    question,
    isLiked: question.likedBy.includes(id)
  })
})



/**
 * @description Like a questions by user if user is authenticated
 *              If the question is already liked unlike the questions from the user
 * @routes PUT/discussion/like-dislike/:slug
 * @access Restricted on user login
 */
export const likeDislikeToggle = catchAsync(async (req, res, next) => {
    const {slug} = req.params
    const { id } = req.user
    const { saveLike, message, likes } = await questionService.likeSingleQuestion(slug, id)
    return res.json({
      success: true,
      message: message,
      totalLikes: likes,
      body: saveLike
    })
})