import express from "express";
import {getAllQuestions} from "../../controllers/question.controller.js";

const router = express.Router();

// AUTH 
router.route('/get-all-questions').get(getAllQuestions)


export default router;