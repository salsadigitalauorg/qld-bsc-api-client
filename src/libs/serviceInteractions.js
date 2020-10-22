const api = require('./api')

async function getServiceGroupsFromInteractions (interactions) {
  console.log(interactions)
  // 1) Get the service ids
  const serviceIds = new Set()
  interactions.forEach(interaction => serviceIds.add(interaction.service_id))
  // 2) Query API for taxonomy terms
  const serviceResults = await api.loadServices({
    filter: {
      group_tid: { condition: { path: 'tid', value: Array.from(serviceIds), operator: 'IN' } }
    }
  })
  // TODO - Will I need to resolve default service interactions?
  // 3) Create array of services
  const services = {}
  serviceResults.forEach(service => {
    service.interactions = []
    services[service.tid] = service
  })
  // 4) Map interactions with their service
  interactions.forEach(interaction => services[interaction.service_id].interactions.push(interaction))
  // 5) Prepare groupings for output
  const groups = {
    services: Object.keys(services).map(key => services[key]),
    totalCount: interactions.length
  }
  return groups
  // IF YOU NEED PROPER RESULTS - UNCOMMENT THE FOLLOWING
  // return {
  //   services: [
  //     {
  //       id: '2',
  //       name: 'Births, deaths, marriages and divorces',
  //       description: '',
  //       interactions: [
  //         {
  //           id: '19',
  //           name: 'Apply for a birth certificate (new or replacement)',
  //           description: 'There are 2 types of birth certificate—standard and commemorative. Only a standard birth certificate can be used for official purposes. You can use your standard birth certificate when applying to government agencies and banks.'
  //         }
  //       ]
  //     }
  //   ],
  //   totalCount: 1
  // }
}

module.exports = {
  getServiceGroupsFromInteractions
}
