import { friendsService } from '../service/index.js'
import { catchAsync } from '../utils/catchAsync.js'

/**
 * @description Add Friend (Request someone to be your friend)
 * @route POST private/friends/add-friend
 * @access private
 */
export const addFriend = catchAsync(async (req, res) => {
    const { recipientId } = req.body
    const { id: senderId } = req.user
    const addFriend = await friendsService.addFriend(senderId, recipientId)
    return res.status(200).json({
        success: true,
        message: 'Friend request sent successfully',
        data: addFriend
    })
})

/**
 * * @NOTE: This API will be used to cancel and reject friend request both
 * @description Cancel Friend Request (Cancel a friend request you sent)
 * @route POST private/friends/cancel-request
 * @access private
 */
export const cancelFriendRequest = catchAsync(async (req, res) => {
    const { recipientId } = req.body
    const { id: senderId } = req.user
    const { message, friendRequest:cancelFriendRequest } = await friendsService.cancelFriendRequest(senderId, recipientId)
    return res.status(200).json({
        success: true,
        message: message,
        data: cancelFriendRequest
    })
})

/**
 * @description Accept Friend Request (Accept a friend request you received)
 * @route POST private/friends/accept-friend-request
 * @access private
 */
export const acceptFriendRequest = catchAsync(async (req, res) => {
    const { senderId } = req.body
    const { id: recipientId } = req.user
    const acceptFriendRequest = await friendsService.acceptFriendRequest(senderId, recipientId)
    return res.status(200).json({
        success: true,
        message: "Friend request accepted successfully",
        data: acceptFriendRequest
    })
})

/**
 * @description Remove Friend (Remove a friend from your friend list)
 * @route POST private/friends/remove-friend
 * @access private
 */
export const removeFriend = catchAsync(async (req, res) => {
    const { friendId  } = req.body
    const { id: userId  } = req.user
    const removeFriend = await friendsService.removeFriend(userId, friendId)
    return res.status(200).json({
        success: true,
        message: "Removed from friend list successfully",
        data: removeFriend
    })
})
