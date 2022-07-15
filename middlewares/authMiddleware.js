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
      const err = new Error('No token, authorization denied')
      err.status = 404;
      throw err;
    }
    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
      if (err) {
        const err = new Error('Token is invalid')
        err.status = 403;
        throw err;
      }
      req.user = user
      next()
    })
  }