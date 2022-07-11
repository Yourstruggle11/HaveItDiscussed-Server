import { userAuthService } from '../service/index.js';
import { catchAsync } from '../utils/catchAsync.js';
import generateAuthToken from '../utils/generateAuthToken.js';

/**
 * @description Sign Up User with Social account
 * @route POST /users/auth/social
 * @access Public
 */
export const authSocialUser = catchAsync(async (req, res, next) => {
  // idToken comes from the client app
  const { idToken } = req.body
//   console.log(idToken)

  const user = await userAuthService.authSocialUser(idToken,next);
  return res.status(200).json({
    success: true,
    email: user.email,
    name: user.name,
    profilePic: user.profilePic,
    registerDate: user.registerDate,
    accessToken: idToken,
    JwtToken: generateAuthToken(user._id)
  })
})
