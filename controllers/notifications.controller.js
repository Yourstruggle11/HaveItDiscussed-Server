import { notificationsService } from '../service/index.js'
import { catchAsync } from '../utils/catchAsync.js'

/**
 * @description Get all notifications for the logged in user
 * @route GET private/notifications/get-all
 * @access private
 */
export const getAllNotifications = catchAsync(async (req, res) => {
    const { id: userId } = req.user
    const getAllNotifications = await notificationsService.getAllNotifications(
        userId
    )
    return res.status(200).json({
        success: true,
        message: 'All notifications fetched successfully',
        data: getAllNotifications
    })
})

/**
 * @description Mark single or all notification as read
 * @route POST private/notifications/mark-as-read
 * @access private
 */
export const markAsRead = catchAsync(async (req, res) => {
    const { id: userId } = req.user
    const { markAll = false, notificationId = null } = req.body
    const markAsRead = await notificationsService.markAsRead(
        userId,
        markAll,
        notificationId
    )
    return res.status(200).json({
        success: true,
        message: markAsRead
    })
})

/**
 * @description Gets last 10 unread notifications for the logged in user
 * @route GET private/notifications/recent-notifications
 * @access private
 */
export const getRecentNotifications = catchAsync(async (req, res) => {
    const { id: userId } = req.user
    const getRecentNotifications = await notificationsService.getRecentNotifications(
        userId
    )
    return res.status(200).json({
        success: true,
        message: 'Last 10 unread notifications fetched successfully',
        data: getRecentNotifications
    })
})
