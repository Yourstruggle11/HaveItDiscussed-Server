import admin from '../config/firebase.admin.config.js'
import UserModel from '../model/user.model.js'

/**
 *
 * @param {string} idToken
 * @returns {Promise<UserModel>}
 */
export const authSocialUser = async (idToken) => {
  admin
    .auth()
    .verifyIdToken(idToken)
    .then(async (decodedToken) => {
      const user = decodedToken
      // check if user exist or not if user exist then only return user data otherwise create a new one
      const userExist = await UserModel.findOne({ email: user.email })

      if (userExist) {
        return userExist
      } else {
        const addedUser = new UserModel({
          email: user.email,
          name: user.name,
          profilePic: user.picture
        })
        await addedUser.save()
        return addedUser
      }
    })
    .catch((error) => {
        const err = new Error(error);
        err.status = 401;
      throw err;
    })
}
