import { notificationsService } from '../service/index.js'
import { catchAsync } from '../utils/catchAsync.js'

/**
 * @description Get all unread notifications for the logged in user 
 * @route GET private/notifications/get-all
 * @access private
 */
export const getAllNotifications = catchAsync(async (req, res) => {
    const { id: userId } = req.user
    const getAllNotifications = await notificationsService.getAllNotifications(userId)
    return res.status(200).json({
        success: true,
        message: 'All notifications fetched successfully',
        data: getAllNotifications
    })
})