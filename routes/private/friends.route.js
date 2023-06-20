import express from 'express';
import {
    addFriend,
    cancelFriendRequest
} from '../../controllers/friends.controller.js';

const router = express.Router();

router.route('/add-friend').post(addFriend);

// * * @NOTE The below API will be used to cancel and reject friend request both
router.route('/cancel-request').post(cancelFriendRequest);
// router.route('/accept-friend').post(addFriend);
// router.route('/remove-friend').post(addFriend);


export default router;
