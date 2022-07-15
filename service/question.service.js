import QuestionModel from '../model/question.model.js'


/**
 *
 * @param {string} questionTitle, questionBody
 * @returns {Promise<UserModel>}
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