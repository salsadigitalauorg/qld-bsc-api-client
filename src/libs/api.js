const axios = require('axios')

const domain = 'https://nginx-php-qld-bsc-develop.au.amazee.io/'

async function loadCriteria () {
  let result = false

  try {
    result = await axios({
      method: 'get',
      url: `${domain}api/v1/eligibility_criteria`,
      auth: {
        username: 'bsc',
        password: 'bsc2020'
      }
    })
  } catch (e) {
    console.log(e)
  }

  if (result && result.data && result.data.data && result.data.data.length > 0) {
    const criteria = {}
    result.data.data.forEach(item => {
      const type = item.type.replace('taxonomy_term--', '')
      if (criteria[type] === undefined) {
        criteria[type] = []
      }
      criteria[type].push({
        id: item.attributes.drupal_internal__tid,
        name: item.attributes.name
      })
    })
    return criteria
  }
  return false
}

async function loadServices () {
  let result = false

  try {
    result = await axios({
      method: 'get',
      url: `${domain}api/v1/services?include=f_agency`,
      auth: {
        username: 'bsc',
        password: 'bsc2020'
      }
    })
  } catch (e) {
    console.log(e)
  }

  if (result && result.data && result.data.data && result.data.data.length > 0) {
    const services = {}
    const allServices = []

    // Get Service and Service interactions
    result.data.data.forEach(item => {
      const type = item.type.replace('node--', '')
      if (services[type] === undefined) {
        services[type] = []
      }

      const index = allServices.length
      services[type].push(index)

      const attrs = item.attributes
      const service = {
        type: type,
        id: attrs.drupal_internal__nid,
        service_id: item.relationships.f_service ? item.relationships.f_service.data.meta.drupal_internal__nid : '',
        name: attrs.title,
        agency_service_id: attrs.f_agency_service_id ? attrs.f_agency_service_id : '',
        do_it_online_url: attrs.f_do_it_online_url ? attrs.f_do_it_online_url.uri : '',
        fees: attrs.f_fees ? attrs.f_fees : '',
        form_url: attrs.f_form_url ? attrs.f_form_url.uri : '',
        how_to: attrs.f_how_to ? attrs.f_how_to.processed : '',
        in_person: attrs.f_in_person ? attrs.f_in_person : '',
        keywords: attrs.f_keywords ? attrs.f_keywords : '',
        long_description: attrs.f_long_description ? attrs.f_long_description.processed : '',
        more_information_url: attrs.f_more_information_url ? attrs.f_more_information_url.uri : '',
        old_qgs_id: attrs.f_old_qgs_id ? attrs.f_old_qgs_id : '',
        old_sir_id: attrs.f_old_sir_id ? attrs.f_old_sir_id : '',
        prerequisites: attrs.f_prerequisites ? attrs.f_prerequisites.processed : '',
        business_unit_name: attrs.f_business_unit_name ? attrs.f_business_unit_name : '',
        service_owner_name: attrs.f_service_owner_name ? attrs.f_service_owner_name : '',
        service_owner_email: attrs.f_service_owner_email ? attrs.f_service_owner_email : '',
        service_owner_status: attrs.f_service_owner_status ? attrs.f_service_owner_status : '',
        service_date: attrs.f_service_date ? attrs.f_service_date.value : '',
        service_date_end: attrs.f_service_date ? attrs.f_service_date.end_value : '',
        service_status: attrs.f_service_status ? attrs.f_service_status : '',
        service_type: attrs.f_service_type ? attrs.f_service_type : '',
        service_validated_date: attrs.f_service_validated_date ? attrs.f_service_validated_date : '',
        short_description: attrs.f_short_description ? attrs.f_short_description : '',
        who_do_i_call: attrs.f_who_do_i_call ? attrs.f_who_do_i_call : '',
        who_is_eligible: attrs.f_who_is_eligible ? attrs.f_who_is_eligible.processed : '',
      }

      // Add agencies
      if (item.relationships.f_agency) {
        const id = item.relationships.f_agency.data.id
        const type = item.relationships.f_agency.data.type
        // Find in included
        let agency = null
        for (var i = 0; i < result.data.included.length; i++) {
          const includeItem = result.data.included[i]
          if (includeItem.type === type && includeItem.id === id) {
            agency = includeItem
            break
          }
        }
        if (agency) {
          service['agency_name'] = agency.attributes.name || ''
          service['agency_type'] = agency.attributes.f_agency_type || ''
          service['agency_acronym'] = agency.attributes.f_agency_acronym ||  ''
          service['agency_website_url'] = agency.attributes.f_agency_website_url.uri || ''
        }
      }

      allServices.push(service)
    })

    // Nest service interactions within services
    return {
      index: services,
      services: allServices
    }
  }
  return false
}

function getServiceGroups (dataset) {
  const groups = {}
  dataset.index.service.forEach(serviceIndex => {
    const service = dataset.services[serviceIndex]
    // Service Interactions
    const serviceInteractions = []
    dataset.index.service_interaction.forEach(interactionIndex => {
      const interaction = dataset.services[interactionIndex]
      if (interaction.service_id === service.id) {
        serviceInteractions.push({
          id: interaction.id,
          title: interaction.name,
          description: interaction.short_description,
          keywordSearch: interaction.name.toUpperCase()
        })
      }
    })
    // Service
    groups[service.name] = {
      id: service.id,
      title: service.name,
      description: service.short_description,
      serviceInteractions: serviceInteractions
    }
  })
  return groups
}

module.exports = {
  loadCriteria,
  loadServices,
  getServiceGroups
}
