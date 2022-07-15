import express from "express";
import { addNewQuestion } from "../../controllers/question.controller.js";

const router = express.Router();

// AUTH 
router.route('/new').post(addNewQuestion)


export default router;