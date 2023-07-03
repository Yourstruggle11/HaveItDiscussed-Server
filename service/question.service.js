import QuestionModel from '../model/question.model.js'
import searchUtility from '../utils/search.js'
import pagination from '../utils/paginate.js'
import UserModel from '../model/user.model.js'
import { AddNotification } from './notifications.service.js'

/**
 *
 * @param {string} questionTitle, questionBody
 * @returns {Promise<QuestionModel>}
 */
export const postNewQuestion = async (
    questionTitle,
    questionBody,
    postedBy,
    keywords
) => {
    const question = new QuestionModel({
        questionTitle,
        questionBody,
        postedBy,
        keywords
    })
    await question.save()

    const whoPostedNewQuestion = await UserModel.findById(postedBy)

    await AddNotification({
        sender: postedBy,
        type: 6,
        message: `${whoPostedNewQuestion?.name} posted a new question`,
        actionURL: `/question/${question.questionSlug}`,
        anyActionNeeded: true,
        isGeneralNotification: true
    })
    return question
}

/**
 *
 * @param {string} N/A
 * @returns {Promise<QuestionModel>}
 */
export const getAllQuestions = async (search, page, limit) => {
    // search keywords and question titles, question body
    const searchQuery = search == 'false' ? {} : searchUtility(search)
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
    const question = await QuestionModel.findOne({ questionSlug }).populate(
        'postedBy'
    )
    if (!question) {
        const err = new Error('No question found')
        err.status = 404
        throw err
    }
    return question
}

/**
 *
 * @returns {Promise<QuestionModel>}
 */
export const getTopAndRecentQuestions = async () => {
    // Fetch recent three questions
    const recentQuestions = await QuestionModel.aggregate([
        {
            $lookup: {
                from: 'comments',
                localField: '_id',
                foreignField: 'question',
                as: 'comments'
            }
        },
        {
            $addFields: {
                commentCount: { $size: '$comments' }
            }
        },
        {
            $sort: { createdAt: -1 }
        },
        {
            $limit: 3
        },
        {
            $lookup: {
                from: 'users',
                localField: 'postedBy',
                foreignField: '_id',
                as: 'postedBy'
            }
        },
        {
            $unwind: '$postedBy'
        },
        {
            $project: {
                questionTitle: 1,
                questionSlug: 1,
                postedBy: {
                    name: 1,
                    profilePic: 1
                },
                commentCount: 1,
                createdAt: 1
            }
        }
    ])

    // Fetch top three questions based on likes and comments
    const topQuestions = await QuestionModel.aggregate([
        {
            $lookup: {
                from: 'comments',
                localField: '_id',
                foreignField: 'question',
                as: 'comments'
            }
        },
        {
            $addFields: {
                commentCount: { $size: '$comments' }
            }
        },
        {
            $sort: { likeCount: -1, commentCount: -1 }
        },
        {
            $limit: 3
        },
        {
            $lookup: {
                from: 'users',
                localField: 'postedBy',
                foreignField: '_id',
                as: 'postedBy'
            }
        },
        {
            $unwind: '$postedBy'
        },
        {
            $project: {
                questionTitle: 1,
                questionSlug: 1,
                likeCount: 1,
                commentCount: 1,
                'postedBy.name': 1,
                'postedBy.profilePic': 1,
                createdAt: 1
            }
        }
    ])

    return { topQuestions, recentQuestions }
}

/**
 *
 * @param {string} slug, id
 * @returns {Promise<QuestionModel>}
 */
export const likeSingleQuestion = async (slug, id) => {
    // Finding Question
    const question = await QuestionModel.findOne({ questionSlug: slug })
    if (question) {
        // Check if the user who hit the api has already liked the question post before
        if (question.likedBy.includes(id)) {
            // decrease the like count of the question
            question.likeCount--
            // Remove user from array
            question.likedBy.pull(id)
            const saveLike = await question.save()
            return {
                saveLike,
                message: 'opps! you disliked the question👎',
                likes: `${question.likeCount}`
            }
        } else {
            // increase the Like count of the question
            question.likeCount++
            // Add user to the array
            question.likedBy.push(id)
            const saveLike = await question.save()

            // Check if the user who liked the comment is not the owner of the comment
            if (id !== question?.postedBy.toString()) {
                const whoLiked = await UserModel.findById(id)

                await AddNotification({
                    sender: id,
                    recipient: question?.postedBy,
                    type: 4,
                    message: `${whoLiked.name} liked your question`,
                    actionURL: `/question/${slug}`,
                    anyActionNeeded: true,
                    isGeneralNotification: false
                })
            }
            return {
                saveLike,
                message: 'Yeah, You Like this question!👍',
                likes: `${question.likeCount}`
            }
        }
    } else {
        const err = new Error('No question found')
        err.status = 404
        throw err
    }
}
