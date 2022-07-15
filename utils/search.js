/**
 *
 * @param {String} search
 * @returns searched question title, question body and keywords query result and compare with search query
 */
 const searchUtility = function (search) {
    if (search && search.length > 0) {
      search = {
        $or: [
          {
            questionTitle: {
              $regex: search,
              $options: 'i'
            }
          },
          {
            questionBody: {
              $regex: search,
              $options: 'i'
            }
          },
          {
            keywords: {
              $in: [search]
            }
          }
        ]
      }
    }
    return search
  }
  
  export default searchUtility
  