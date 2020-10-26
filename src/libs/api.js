const { queryAPI, queryAPIAll } = require('./utils')
const parse = require('./mapping')

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
  return parse.criteria(data)
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
  return parse.service(data)
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
  return parse.serviceInteraction(data)
}

/**
 * Loads grouped services.
 */
async function loadGroupedServiceInteractions (options) {
  const interactionsResult = await loadServiceInteractions(options)
  // 1) Get unique service ids
  const serviceIds = new Set()
  interactionsResult.interactions.forEach(interaction => serviceIds.add(interaction.service_id))
  // 2) Query API for service taxonomy terms
  const serviceResults = await loadServices({
    filter: {
      group_tid: { condition: { path: 'tid', value: Array.from(serviceIds), operator: 'IN' } }
    }
  })
  // 3) Create array of services
  const services = {}
  serviceResults.forEach(service => {
    service.interactions = []
    services[service.tid] = service
  })
  // 4) Map interactions with their service
  interactionsResult.interactions.forEach(interaction => services[interaction.service_id].interactions.push(interaction))
  const groupedServices = Object.keys(services).map(key => services[key])
  return {
    services: groupedServices,
    totalCount: interactionsResult.totalCount
  }
}

/**
 * Load a Service / Service Interaction from API given an id.
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
    return parse.fullServiceInteraction(data)
  } else {
    return false
  }
}

module.exports = {
  loadCriteria,
  loadServices,
  loadServiceInteractions,
  loadGroupedServiceInteractions,
  loadFullServiceInteraction
}
