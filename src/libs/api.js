const { queryAPI, queryAPIAll } = require('./utils')

const domain = 'https://nginx-php-qld-bsc-develop.au.amazee.io/'
const auth = { username: 'bsc', password: 'bsc2020' }

/**
 * Loads all filter criteria.
 * Returns an object with criteria names as keys, and arrays as values.
 */
async function loadCriteria () {
  const data = await queryAPIAll({
    endpoint: `${domain}api/v1/eligibility_criteria`,
    endpointAuth: auth,
    sort: [ 'weight' ]
  })
  return data
}

/**
 * Loads all filter criteria.
 * Returns an object with criteria names as keys, and arrays as values.
 */
async function loadServices (options) {
  const data = await queryAPI({
    endpoint: `${domain}api/v1/taxonomy_term/services`,
    endpointAuth: auth,
    filter: options.filter
  })
  return data
}

/**
 * Loads a list of service interactions.
 * @param {Object} options Filters and pages { filter: {}, page: { limit, offset } }
 */
async function loadServiceInteractions (options) {
  const data = await queryAPI({
    endpoint: `${domain}api/v1/node/service_interaction`,
    endpointAuth: auth,
    include: [],
    filter: options.filter,
    sort: [
      'f_service.name',
      'title'
    ],
    page: options.page
  })
  return data
}

/**
 * Load a Service Interaction from API given an id.
 * @param {String} id Node Id of Service / Service Interaction
 */
async function loadFullServiceInteraction (id) {
  if (id) {
    const data = await queryAPI({
      endpoint: `${domain}api/v1/node/service_interaction`,
      endpointAuth: auth,
      include: ['f_agency'],
      filter: { nid: id }
    })
    return data
  } else {
    return false
  }
}

module.exports = {
  loadCriteria,
  loadServices,
  loadServiceInteractions,
  loadFullServiceInteraction
}
