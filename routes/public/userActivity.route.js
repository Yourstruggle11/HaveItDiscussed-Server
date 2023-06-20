import express from 'express';
import { getUserDetailsByUserNameAndNo } from '../../controllers/userActivity.controller.js';

const router = express.Router();

router.route('/:userNo/:userName').get(getUserDetailsByUserNameAndNo);

export default router;
