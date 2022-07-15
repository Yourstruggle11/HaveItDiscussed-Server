/**
 *
 * @param {Array} data - array of objects
 * @param {Number} page - page number
 * @param {Number} limit - limit of blogs per page
 * @returns documents from Model from particular page and limit
 * @summary pagination function for blogs
 * As of now a temporary solution has been provided will be replaced with pagination library in future
 */
 const pagination = async function (data, page = 1, limit) {
    if (page && limit) {
      const startIndex = (page - 1) * limit
      const endIndex = page * limit
      //* slice method will return the array of documents from startIndex to endIndex
      const docs = data.slice(startIndex, endIndex)
      return docs
    }
    return data
  }
  
  export default pagination
  