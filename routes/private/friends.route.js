import express from 'express';
import {
    addFriend,
} from '../../controllers/friends.controller.js';

const router = express.Router();

router.route('/add-friend').post(addFriend);

export default router;
