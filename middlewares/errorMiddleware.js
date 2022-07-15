export const notFound = (req, res, next) => {
    const error = new Error(`Not Found : ${req.originalUrl}`)
    res.status(404)
    next(error)
  }
  
  export const errorHandler = (err, req, res, next) => {
    const statusCode = err.status === 200 ? 500 : err.status
    
    res.status(statusCode)
    res.json({
      success: false,
      message: err.message,
      stack: process.env.NODE_ENV === 'production' ? null : err.stack
    })
  }  
  