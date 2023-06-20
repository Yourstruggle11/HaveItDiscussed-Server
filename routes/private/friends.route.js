import express from 'express'
import {
    addFriend,
    cancelFriendRequest,
    acceptFriendRequest,
    removeFriend
} from '../../controllers/friends.controller.js'

const router = express.Router()

router.route('/add-friend').post(addFriend)

// * * @NOTE The below API will be used to cancel and reject friend request both
router.route('/cancel-request').post(cancelFriendRequest)

router.route('/accept-friend-request').post(acceptFriendRequest)
router.route('/remove-friend').post(removeFriend)

export default router
