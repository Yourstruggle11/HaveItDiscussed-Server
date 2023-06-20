import express from 'express'
import verifyAuthToken from './verifyAuthToken.js'
import questionRoute from './questionRoute.js'
import commentRoute from './commentRoute.js'
import userActivityRoute from './userActivity.route.js';
import friendsRoute from './friends.route.js';
import { userRouteProtection } from '../../middlewares/authMiddleware.js'

const router = express.Router()

// AUTH ROUTE
router.use('/users/auth', userRouteProtection, verifyAuthToken)
router.use('/discussion', userRouteProtection, questionRoute)
router.use('/comments', userRouteProtection, commentRoute)

// USER ACTIVITIES ROUTES
router.use('/user-activities', userRouteProtection, userActivityRoute);

// FRIENDS ROUTES
router.use('/friends', userRouteProtection, friendsRoute);

export default router
