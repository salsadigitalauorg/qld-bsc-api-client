const { queryAPI, queryAPIAll } = require('./utils')

/**
 * Loads all filter criteria.
 * Returns an object with criteria names as keys, and arrays as values.
 */
async function loadCriteria (domain) {
  const data = await queryAPIAll({
    endpoint: `${domain.url}api/v1/eligibility_criteria`,
    endpointAuth: domain.auth,
    sort: [ 'weight' ]
  })
  return data
}

/**
 * Loads all filter criteria.
 * Returns an object with criteria names as keys, and arrays as values.
 */
async function loadServices (domain, options) {
  const data = await queryAPI({
    endpoint: `${domain.url}api/v1/taxonomy_term/services`,
    endpointAuth: domain.auth,
    filter: options.filter,
    sort: [ 'name' ]
  })
  return data
}

/**
 * Loads a list of service interactions.
 * @param {Object} options Filters and pages { filter: {}, page: { limit, offset } }
 */
async function loadServiceInteractions (domain, options) {
  const data = await queryAPI({
    endpoint: `${domain.url}api/v1/node/service_interaction`,
    endpointAuth: domain.auth,
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
async function loadFullServiceInteraction (domain, id) {
  if (id) {
    const data = await queryAPI({
      endpoint: `${domain.url}api/v1/node/service_interaction`,
      endpointAuth: domain.auth,
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
