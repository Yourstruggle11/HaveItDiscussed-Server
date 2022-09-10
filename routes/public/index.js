import express from 'express'
import userAuthRoute from './userAuth.js'
import questionRoute from './questionRoute.js'
import commentRoute from './commentRoute.js'

const router = express.Router()

// AUTH ROUTE
router.use('/users/auth', userAuthRoute)
router.use('/discussion', questionRoute)
router.use('/comments', commentRoute)

export default router
