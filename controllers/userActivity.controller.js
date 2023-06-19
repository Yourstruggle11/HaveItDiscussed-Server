import { userActivityService } from '../service/index.js'
import { catchAsync } from '../utils/catchAsync.js'

/**
 * @description Update user profile
 * @route PUT private/user-activities/update-profile
 * @access private
 */
export const updateProfile = catchAsync(async (req, res) => {
    const { id: userId } = req.user
    const updateProfile = await userActivityService.updateProfile(userId, req.body)
    return res.status(200).json({
        success: true,
        message: 'Profile updated successfully',
        data: updateProfile
    })
})

/**
 * @description Get user details by user name and user no
 * @route GET public/user-activities/:userNo/:userName
 * @access private
 */
export const getUserDetailsByUserNameAndNo = catchAsync(async (req, res) => {
    const { userName, userNo } = req.params
    const {user:getUserDetailsByUserNameAndNo,totalLikes,totalComments} =
        await userActivityService.getUserDetailsByUserNameAndNo(userName,userNo)
    return res.status(200).json({
        success: true,
        message: 'User details fetched successfully',
        data: getUserDetailsByUserNameAndNo,
        totalLikes,
        totalComments
    })
})
