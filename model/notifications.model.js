import mongoose from 'mongoose'

const notificationsSchema = new mongoose.Schema(
    {
        sender: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true
        },
        recipient: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true
        },
        type: {
            type: String,
            required: true,
            enum: [
                'Friend request received',
                'Friend request accept',
                'Comment received on question',
                'Like received on question',
                'Like received on comment',
                'New question posted'
            ]
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
            required: true
        },
        anyActionNeeded: Boolean,
        isGeneralNotification: {
            type: Boolean,
            default: false
        }
    },
    { timestamps: true }
)

const NotificationModel = mongoose.model('Friend', notificationsSchema)

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
