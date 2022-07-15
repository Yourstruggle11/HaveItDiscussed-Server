import express from "express";
import { addNewComment,getAllCommentsOfAQuestion } from "../../controllers/comments.controller.js";

const router = express.Router();

// AUTH 
router.route('/:questionId/create').post(addNewComment)
router.route('/:questionId').get(getAllCommentsOfAQuestion)
// router.route('/like-dislike').put(likeDislikeToggle)


export default router;