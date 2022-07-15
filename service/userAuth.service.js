import admin from '../config/firebase.admin.config.js'
import UserModel from '../model/user.model.js'
import jwt from 'jsonwebtoken'


/**
 *
 * @param {string} idToken
 * @returns {Promise<UserModel>}
 */
export const authSocialUser = async (idToken) => {
  return admin
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
      var err = new Error(error);
      err.status = 400;
      throw err;
    })
}



/**
 *
 * @param {string} token
 * @returns {Promise<UserModel>}
 */
 export const verifyTokenService = async (token) => {
  if(!token) {
    var err = new Error("token is empty");
    err.status = 404;
    throw err;
  }

  jwt.verify(token, process.env.JWT_SECRET, (error, user) => {
    if (error) {
      var err = new Error(error);
      err.status = 403;
      throw err;
    }
    else{
      return user
    }
  })
}