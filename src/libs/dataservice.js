const api = require('./api')
const parse = require('./mapping')

async function getCriteria (domain) {
  const data = await api.loadCriteria(domain)
  return parse.criteria(data)
}

async function getGroupedServiceInteractions (domain, options) {
  const interactionsData = await api.loadServiceInteractions(domain, options)
  const interactionsResults = parse.serviceInteraction(interactionsData)
  // 1) Get unique service ids
  const serviceIds = new Set()
  interactionsResults.forEach(interaction => serviceIds.add(interaction.service_id))
  // 2) Query API for service taxonomy terms
  const serviceData = await api.loadServices(domain, {
    filter: {
      group_tid: { condition: { path: 'tid', value: Array.from(serviceIds), operator: 'IN' } }
    }
  })
  const serviceResults = parse.service(serviceData)
  // 3) Create array of services
  const services = {}
  if (serviceResults) {
    serviceResults.forEach(service => {
      service.interactions = []
      services[service.tid] = service
    })
  }
  // 4) Map interactions with their service
  interactionsResults.forEach(interaction => {
    if (!services[interaction.service_id]) {
      console.log(`Error: Was unable to find a service group for tid ${interaction.service_id}. Creating fallback.`)
      // If a service can't be found, but a label exists on the interaction
      // create a fallback group. Fallback id is null to indicate no link required.
      services[interaction.service_id] = {
        id: null,
        interactions: [],
        name: interaction.service_label,
        tid: null,
      }
    }
    else if (!services[interaction.service_id].name) {
      // Service was returned with no name. This will apply the service name
      // stored on the interaction to avoid an unnamed service.
      console.log(`Error: Setting service ${interaction.service_id} name to ${interaction.service_label}`)
      services[interaction.service_id].name = interaction.service_label
    }
    services[interaction.service_id].interactions.push(interaction)
  })
  const groupedServices = Object.keys(services).map(key => services[key]).sort((a, b) => a.name.localeCompare(b.name))
  return {
    services: groupedServices,
    totalCount: parseInt(interactionsData.meta.count)
  }
}

async function getFullServiceInteraction (domain, id) {
  const data = await api.loadFullServiceInteraction(domain, id)
  return parse.fullServiceInteraction(data)
}

module.exports = {
  getCriteria,
  getGroupedServiceInteractions,
  getFullServiceInteraction
}
