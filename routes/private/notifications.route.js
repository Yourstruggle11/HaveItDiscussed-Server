import express from 'express'
import {
    getAllNotifications
} from '../../controllers/notifications.controller.js'

const router = express.Router()

router.route('/get-all').get(getAllNotifications)

export default router
