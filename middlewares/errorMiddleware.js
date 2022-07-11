export const notFound = (req, res, next) => {
    const error = new Error(`Not Found : ${req.originalUrl}`)
    res.status(404)
    next(error)
  }
  
  export const errorHandler = (err, req, res, next) => {
    const code = err.code;
    const message = err.message;
    res.writeHead(code, message, {'content-type' : 'text/plain'});
    res.end(message);
    // const statusCode = res.statusCode === 200 ? 500 : res.statusCode
    // res.status(statusCode)
    // res.json({
    //   success: false,
    //   message: err.message,
    //   stack: process.env.NODE_ENV === 'production' ? null : err.stack
    // })
  }  