import jwt from 'jsonwebtoken'

const generateAuthToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRY_TIME
  })
}

export default generateAuthToken
