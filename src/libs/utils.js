const axios = require('axios')

/**
 * Helper to merge the fields of Object a and b together.
 * Object a's field is uodated.
 * @param {Object} a
 * @param {Object} b
 * @param {String} field name of property to merge between object a and b
 */
function mergeField (a, b, field) {
  if (a[field] && b[field]) {
    a[field] = [...a[field], ...b[field]]
  } else if (!a[field] && b[field]) {
    a[field] = b[field]
  }
}

/**
 * Perform request to the API.
 * @param {String} url
*/
async function request (url, auth) {
  try {
    const result = await axios({
      method: 'get',
      url: url,
      auth: auth
    })
    return result
  } catch (e) {
    console.log(e)
    return false
  }
}

/**
 * Performs request to the API to exhaust all pages.
 * Returns the concatenated results for data and included.
 * Does not return links.
 * @param {String} url
 */
async function recursiveRequest (url, auth) {
  const result = await request(url, auth)
  const resultData = result.data
  const nextUrl = (resultData && resultData.links && resultData.links.next && resultData.links.next.href) ? result.data.links.next.href : false
  delete resultData.links
  if (nextUrl) {
    const nextResult = await recursiveRequest(nextUrl, auth)
    const mergedResult = Object.assign({}, resultData)
    mergeField(mergedResult, nextResult, 'data')
    mergeField(mergedResult, nextResult, 'included')
    return mergedResult
  } else {
    return resultData
  }
}

function convertFilterObjectToStringArray(obj, path) {
  const objType = Array.isArray(obj) ? 'array' : typeof obj
  let rtnArr = []
  switch (objType) {
    case 'array':
      obj.forEach(item => {
        rtnArr.push(`${path}[]=${item}`)
      })
      break
    case 'string':
    case 'number':
      rtnArr.push(`${path}=${obj}`)
      break
    case 'object':
      Object.keys(obj).forEach(key => {
        const item = convertFilterObjectToStringArray(obj[key], `${path}[${key}]`)
        rtnArr = [...rtnArr, ...item]
      })
      break
  }
  return rtnArr
}

function buildQuery(options) {
  let queries = []
  // Include
  if (options.include && options.include.length > 0) {
    queries.push(`include=${options.include.join(',')}`)
  }
  // Sort
  if (options.sort && options.sort.length > 0) {
    queries.push(`sort=${options.sort.join(',')}`)
  }
  // Page
  if (options.page) {
    queries = [...queries, ...convertFilterObjectToStringArray(options.page, 'page')]
  }
  // Filter
  if (options.filter) {
    queries = [...queries, ...convertFilterObjectToStringArray(options.filter, 'filter')]
  }
  return `${options.endpoint}?${queries.join('&')}`
}

async function queryAPI (options) {
  const result = await request(buildQuery(options), options.endpointAuth)
  return result.data
}

async function queryAPIAll (options) {
  const resultData = await recursiveRequest(buildQuery(options), options.endpointAuth)
  return resultData
}

module.exports = {
  queryAPI,
  queryAPIAll
}
