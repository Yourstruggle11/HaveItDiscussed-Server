import { userAuthService } from '../service/index.js'
import { catchAsync } from '../utils/catchAsync.js'
import generateAuthToken from '../utils/generateAuthToken.js'

/**
 * @description Sign Up User with Social account
 * @route POST /users/auth/social
 * @access Public
 */
export const authSocialUser = catchAsync(async (req, res, next) => {
    // idToken comes from the client app
    const { idToken } = req.body

    const user = await userAuthService.authSocialUser(idToken)
    return res.status(200).json({
        success: true,
        id: user._id,
        email: user.email,
        name: user.name,
        profilePic: user.profilePic,
        registerDate: user.registerDate,
        accessToken: idToken,
        JwtToken: generateAuthToken(user._id)
    })
})

/**
 * @description verifyToken a user session
 * @route POST /users/auth/verifyToken
 * @access private
 */
export const verifyToken = catchAsync(async (req, res, next) => {
    const token = req.body.token || req.query.token || req.user

    const user = await userAuthService.verifyTokenService(token)
    return res.status(200).json({
        success: true,
        message: 'Token verify successfully',
        data: user
    })
})
