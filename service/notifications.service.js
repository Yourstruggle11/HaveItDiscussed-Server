import ErrorHandler from '../middlewares/ErrorClass.js'
import UserModel from '../model/user.model.js'
import NotificationModel from '../model/notifications.model.js'

/**
 * @param {object} requestBody
 * @returns {Promise<NotificationModel>}
 */
export const AddNotification = async (requestBody) => {
    try {
        // Extract the necessary data from the request body
        const {
            sender,
            recipient,
            type,
            message,
            actionURL,
            anyActionNeeded,
            isGeneralNotification
        } = requestBody

        // Create a new notification object
        const newNotification = new NotificationModel({
            sender,
            recipient,
            type,
            message,
            actionURL,
            anyActionNeeded,
            isGeneralNotification
        })

        // Save the notification to the database
        await newNotification.save()

        return newNotification
    } catch (error) {
        throw ErrorHandler.badRequestError(error.message)
    }
}

/**
 * @param {string} userId
 * @returns {Promise<NotificationModel>}
 */
export const getAllNotifications = async (userId) => {
    try {
        // Find unread notifications for the specified recipient where isGeneralNotification is true
        const unreadNotifications = await NotificationModel.find({
            $or: [
                { recipient: userId, isRead: false },
                {
                    isGeneralNotification: true,
                    sender: { $ne: userId },
                    isRead: false
                }
            ]
        }).sort({ createdAt: -1 })

        return unreadNotifications
    } catch (error) {
        throw ErrorHandler.badRequestError(error.message)
    }
}

/**
 * @param {string} userId
 * @param {boolean} markAll
 * @param {string | null} notificationId
 * @returns {Promise<NotificationModel>}
 */
export const markAsRead = async (userId, markAll, notificationId) => {
    try {
        // check if notificationId exists
        if (notificationId !== null) {
            const notification = await NotificationModel.findOne({
                _id: notificationId,
                recipient: userId
            })
            if (!notification) {
                throw ErrorHandler.badRequestError('Notification does not exist')
            }
        }

        if (markAll && notificationId === null) {
            const unreadNotifications = await NotificationModel.updateMany(
                {
                    recipient: userId,
                    isRead: false
                },
                { isRead: true }
            )

            return 'All notifications marked as read successfully'
        }

        const unreadNotifications = await NotificationModel.updateOne(
            {
                _id: notificationId,
                recipient: userId,
                isRead: false
            },
            { isRead: true }
        )

        return 'Notification marked as read successfully'
    } catch (error) {
        throw ErrorHandler.badRequestError(error.message)
    }
}
