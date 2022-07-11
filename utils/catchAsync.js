/**
 * automic function applied instead of trycatch
 * @param {Function} fn
 * @returns
 */
 export const catchAsync = (fn) => (req, res, next) => {
    Promise.resolve(fn(req, res, next)).catch((err) => next(err))
  }
  