const api = require('./api')
const parse = require('./mapping')

async function getCriteria () {
  const data = await api.loadCriteria()
  return parse.criteria(data)
}

async function getGroupedServiceInteractions (options) {
  const interactionsData = await api.loadServiceInteractions(options)
  const interactionsResults = parse.serviceInteraction(interactionsData)
  // 1) Get unique service ids
  const serviceIds = new Set()
  interactionsResults.forEach(interaction => serviceIds.add(interaction.service_id))
  // 2) Query API for service taxonomy terms
  const serviceData = await api.loadServices({
    filter: {
      group_tid: { condition: { path: 'tid', value: Array.from(serviceIds), operator: 'IN' } }
    }
  })
  const serviceResults = parse.service(serviceData)
  // 3) Create array of services
  const services = {}
  serviceResults.forEach(service => {
    service.interactions = []
    services[service.tid] = service
  })
  // 4) Map interactions with their service
  interactionsResults.forEach(interaction => services[interaction.service_id].interactions.push(interaction))
  const groupedServices = Object.keys(services).map(key => services[key])
  return {
    services: groupedServices,
    totalCount: parseInt(interactionsData.meta.count)
  }
}

async function getFullServiceInteraction (id) {
  const data = await api.loadFullServiceInteraction(id)
  return parse.fullServiceInteraction(data)
}

module.exports = {
  getCriteria,
  getGroupedServiceInteractions,
  getFullServiceInteraction
}
