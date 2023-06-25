import mongoose from 'mongoose'

const notificationsSchema = new mongoose.Schema(
    {
        sender: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        },
        recipient: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        },
        type: {
            type: Number,
            required: true,
            enum: [1, 2, 3, 4, 5, 6],
            description: `1: Friend request received
            2: Friend request accept
            3: Comment received on question
            4: Like received on question
            5: Like received on comment
            6: New question posted`
        },
        message: {
            type: String,
            required: true
        },
        isRead: {
            type: Boolean,
            default: false
        },
        actionURL: {
            type: String,
            description: `
            1: /users/{userNo}/{userName}
            2: /users/{userNo}/{userName}
            3: /question/{questionSlug}
            4: /question/{questionSlug}
            5: /question/{questionSlug}
            6: /question/{questionSlug}
            `
        },
        anyActionNeeded: {
            type: Boolean,
            default: true
        },
        isGeneralNotification: {
            type: Boolean,
            default: false
        }
    },
    { timestamps: true }
)

const NotificationModel = mongoose.model('Notification', notificationsSchema)

export default NotificationModel

//** DOCUMENTATION AS OF 22-06-2023 */

/**
 * Type of notificationS

Lets say there are two users, user A user B

01 When sent a friend request 
	notification type: Friend request received
	example: user A sent friend request to user B
	action by: user A
	action against: user B
	who should receive notification: B

02 When accept a friend request
	notification type: Friend request accept
	example: user B accepted friend request of user B
	action by: user B
	action against: user A
	who should receive notification: A

03 When someone comment on my question
	notification type: Comment received on question
	example: user B commented on user A's question
	action by: user B
	action against: user A
	who should receive notification: A

04 When someone liked your question
	notification type: Like received on question
	example: user B Liked user A's question
	action by: user B
	action against: user A
	who should receive notification: A

05 When someone liked your comment 
	notification type: Like received on comment
	example: user B Liked user A's comment
	action by: user B
	action against: user A
	who should receive notification: A

06 When someone post a new question
	notification type: New question posted
	example: user A posted a new question
	action by: user A
	action against: No one
	who should receive notification: all users present on the platform
 */
