import express from 'express'
import {
    getAllNotifications,
    markAsRead
} from '../../controllers/notifications.controller.js'

const router = express.Router()

router.route('/get-all').get(getAllNotifications)
router.route('/mark-as-read').post(markAsRead)

export default router
