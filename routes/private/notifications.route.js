import express from 'express'
import {
    getAllNotifications,
    markAsRead,
    getRecentNotifications
} from '../../controllers/notifications.controller.js'

const router = express.Router()

router.route('/get-all').get(getAllNotifications)
router.route('/mark-as-read').put(markAsRead)
router.route("/recent-notifications").get(getRecentNotifications) // this will fetch recet 10 unread notifications

export default router
