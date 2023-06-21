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
