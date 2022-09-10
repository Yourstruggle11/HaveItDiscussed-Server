import express from 'express'
import {
    addNewComment,
    likeDislikeToggle
} from '../../controllers/comments.controller.js'

const router = express.Router()

// AUTH
router.route('/:questionId/create').post(addNewComment)
router.route('/like-dislike/:commentId').put(likeDislikeToggle)

export default router
