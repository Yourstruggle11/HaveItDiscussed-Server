import express from 'express'
import {
    addNewQuestion,
    likeDislikeToggle
} from '../../controllers/question.controller.js'

const router = express.Router()

// AUTH
router.route('/new').post(addNewQuestion)
router.route('/like-dislike/:slug').put(likeDislikeToggle)

export default router
