import QuestionModel from '../model/question.model.js'
import searchUtility from '../utils/search.js'
import pagination from '../utils/paginate.js'


/**
 *
 * @param {string} questionTitle, questionBody
 * @returns {Promise<QuestionModel>}
 */
export const postNewQuestion = async (questionTitle,questionBody,postedBy) => {
    const question = new QuestionModel({
        questionTitle,
        questionBody,
        postedBy
      })
      await question.save();
      return question
}


/**
 *
 * @param {string} N/A
 * @returns {Promise<QuestionModel>}
 */
export const getAllQuestions = async (page, limit, search) => {
      // search keywords and question titles, question body
  const searchQuery = searchUtility(search)
    // get all blogs with search query from QuestionModel and poppulate with author and sort by date and remove question body while calling
    let questions = await QuestionModel.find({ ...searchQuery })
    .populate('postedBy')
    .sort({ createdAt: -1 })
    .select('-questionBody')
  const totalQuestions = questions.length
  questions = questions && (await pagination(questions, page, limit))
  return { totalQuestions, questions }
}


/**
 *
 * @param {string} questionSlug
 * @returns {Promise<QuestionModel>}
 */
export const getSingleQuestion = async (questionSlug) => {
    const question = await QuestionModel.findOne({ questionSlug }).populate('postedBy')
    if (!question) {
        const err = new Error('No question found');
        err.status = 404;
        throw err
    }
    return question
}


/**
 *
 * @param {string} slug, _id
 * @returns {Promise<QuestionModel>}
 */
export const likeSingleQuestion = async (slug, _id) => {
  // Finding Question
  const question =  await QuestionModel(slug)
  if (question) {
    // Check if the user who hit the api has already liked the question post before
    if (question.likedBy.includes(_id)) {
      // decrease the like count of the question
      question.likeCount--
      // Remove user from array
      question.likedBy.pull(_id)
      const saveLike = await question.save()
      return {
        saveLike,
        message: 'Question unliked successful!',
        likes: `${question.likeCount}`
      }
    } else {
      // increase the Like count of the question
      question.likeCount++
      // Add user to the array
      question.likedBy.push(_id)
      const saveLike = await question.save()
      return {
        saveLike,
        message: 'Question liked successful!',
        likes: `${question.likeCount}`
      }
    }
  } else {
    const err = new Error('No question found');
    err.status = 404;
    throw err
  }
}