import express from 'express';
import {
    updateProfile,
} from '../../controllers/userActivity.controller.js';

const router = express.Router();

router.route('/update-profile').put(updateProfile);

export default router;
