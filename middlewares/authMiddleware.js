import jwt from 'jsonwebtoken'
import ErrorHandler from './ErrorClass.js';

export const userRouteProtection = (req, res, next) => {
    // get auth token from header
    const authHeader = req.headers.authorization;
    const authBody = req.body.token;
    let token;

    if (authBody) {
        // get auth token from body
        token = authBody;
    } else if (authHeader) {
        // get auth token from header
        token = authHeader && authHeader.split(' ')[1];
    } else {
        throw ErrorHandler.notFoundError('No token present, authorization denied');
    }
    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if (err) {
            throw ErrorHandler.forbidden('Token is invalid');
        }
        req.user = user;
        next();
    });
}
