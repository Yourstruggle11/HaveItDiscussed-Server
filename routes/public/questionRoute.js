import express from 'express'
import {
    getAllQuestions,
    getSingleQuesion
} from '../../controllers/question.controller.js'

const router = express.Router()

// AUTH
router.route('/get-all-questions').get(getAllQuestions)
router.route('/get-single-question/:questionSlug').get(getSingleQuesion)

export default router
