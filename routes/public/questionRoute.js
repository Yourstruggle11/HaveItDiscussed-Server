import express from 'express'
import {
    getAllQuestions,
    getSingleQuesion,
    getTopAndRecentQuestions
} from '../../controllers/question.controller.js'

const router = express.Router()

router.route('/get-all-questions').get(getAllQuestions)
router.route('/get-single-question/:questionSlug').get(getSingleQuesion)
router.route('/questions/top-recent').get(getTopAndRecentQuestions)


export default router
