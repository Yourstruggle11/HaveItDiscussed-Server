import express from 'express'
import { verifyToken } from '../../controllers/userAuth.controller.js'

const router = express.Router()

// AUTH
router.route('/verifyToken').post(verifyToken)

export default router
