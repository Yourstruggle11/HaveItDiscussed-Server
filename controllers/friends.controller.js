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
