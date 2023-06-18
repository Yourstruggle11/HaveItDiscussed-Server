import { userActivityService } from '../service/index.js';
import { catchAsync } from '../utils/catchAsync.js';

/**
 * @description Update user profile
 * @route PUT private/user-activities/update-profile
 * @access private
 */
export const updateProfile = catchAsync(async (req, res) => {
    const { id: userId } = req.user;
    const updateProfile = await userActivityService.updateProfile(
        userId,
        req.body
    );
    return res.status(200).json({
        success: true,
        message: 'Profile updated successfully',
        data: updateProfile,
    });
});