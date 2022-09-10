import express from 'express'
import { getAllCommentsOfAQuestion } from '../../controllers/comments.controller.js'

const router = express.Router()

router.route('/:questionId').get(getAllCommentsOfAQuestion)

export default router
