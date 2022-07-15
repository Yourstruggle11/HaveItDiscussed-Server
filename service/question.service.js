import QuestionModel from '../model/question.model.js'
import searchUtility from '../utils/search.js'


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
  return { totalQuestions, questions }
}