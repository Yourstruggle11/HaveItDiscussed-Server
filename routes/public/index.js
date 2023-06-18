import express from 'express'
import userAuthRoute from './userAuth.js'
import questionRoute from './questionRoute.js'
import commentRoute from './commentRoute.js'
import userActivityRoute from './userActivity.route.js';

const router = express.Router()

// AUTH ROUTE
router.use('/users/auth', userAuthRoute)
router.use('/discussion', questionRoute)
router.use('/comments', commentRoute)

// USER ACTIVITIES ROUTES
router.use('/user-activities', userActivityRoute);

export default router
