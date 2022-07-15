import jwt from 'jsonwebtoken'

export const userRouteProtection = (req, res, next) => {
    // get auth token from header
    const authHeader = req.headers.authorization
    const authBody = req.body.token
    let token
  
    if (authBody) {
      // get auth token from body
      token = authBody
    } else if (authHeader) {
      // get auth token from header
      token = authHeader && authHeader.split(' ')[1]
    } else {
      return res
        .sendStatus(401)
        .json({ success: false, error: 'No token, authorization denied' })
    }
    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
      if (err) {
        return res.sendStatus(403).json({ success: false, error: 'Token is invalid' })
      }
      req.user = user
      next()
    })
  }