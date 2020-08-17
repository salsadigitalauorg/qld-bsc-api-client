const axios = require('axios')

const domain = 'https://nginx-php-qld-bsc-master.au.amazee.io/'

const criteriaFields = {
  criteria_age: {
    label: 'Age',
    queryName: 'age',
    fieldName: 'f_criteria_age'
  },
  criteria_authentication_level: {
    label: 'Authentication level',
    queryName: 'auth',
    fieldName: 'f_criteria_authentication_level'
  },
  criteria_business_sector: {
    label: 'Business sector',
    queryName: 'sector',
    fieldName: 'f_criteria_business_sector'
  },
  criteria_card_licences_permits: {
    label: 'Card, licenses and permits',
    queryName: 'permits',
    fieldName: 'f_criteria_card_licences_permits'
  },
  criteria_housing: {
    label: 'Housing',
    queryName: 'housing',
    fieldName: 'f_criteria_housing'
  },
  criteria_lifestage: {
    label: 'Lifestage',
    queryName: 'lifestage',
    fieldName: 'f_criteria_lifestage'
  },
  criteria_location: {
    label: 'Location',
    queryName: 'loc',
    fieldName: 'f_criteria_location'
  },
  criteria_residency_status: {
    label: 'Residency status',
    queryName: 'residency',
    fieldName: 'f_criteria_residency_status'
  }
}

function buildUrl (domain, filters) {
  let queries = []

  queries.push(`include=f_agency`)

  filters.forEach(filter => {
    if (filter.value && filter.value !== '') {
      queries.push(`filter[${filter.field}.drupal_internal__tid][value]=${filter.value}`)
    }
  })

  return `${domain}api/v1/services?${queries.join('&')}`
}

async function request (url) {
  try {
    const result = await axios({
      method: 'get',
      url: url,
      auth: {
        username: 'bsc',
        password: 'bsc2020'
      }
    })
    return result
  } catch (e) {
    console.log(e)
    return false
  }
}

async function recursiveRequest (url) {
  const result = await request(url)
  if (result.data && result.data.links && result.data.links.next && result.data.links.next.href) {
    const next = await recursiveRequest(result.data.links.next.href)
    return [...result.data.data, ...next]
  } else {
    return result.data.data
  }
}

async function loadCriteria () {
  const result = await recursiveRequest(`${domain}api/v1/eligibility_criteria`)

  if (result && result.length > 0) {
    const criteria = {}
    result.forEach(item => {
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

async function loadServices (filters) {
  const result = await request(buildUrl(domain, filters))

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
        fees: attrs.f_fees ? attrs.f_fees.processed : '',
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
  const groupNameById = {}

  // Create parent service groups
  if (dataset.index.service) {
    dataset.index.service.forEach(serviceIndex => {
      const service = dataset.services[serviceIndex]
      groupNameById[service.id] = service.name
      groups[service.name] = {
        id: service.id,
        title: service.name,
        description: service.short_description
      }
    })
  }

  // Add child service interactions
  if (dataset.index.service_interaction) {
    dataset.index.service_interaction.forEach(interactionIndex => {
      const interaction = dataset.services[interactionIndex]
      const interactionResult = {
        id: interaction.id,
        title: interaction.name,
        description: interaction.short_description,
        keywordSearch: interaction.name.toUpperCase()
      }
      let addToGroup = groupNameById[interaction.service_id]

      // If group not found, add to an unsorted bucket.
      if (addToGroup === undefined) {
        addToGroup = 'unsorted'
        if (!groups[addToGroup]) {
          groups[addToGroup] = {
            id: -1,
            title: 'Interactions with no service'
          }
        }
      }

      if (addToGroup) {
        if (!groups[addToGroup]['serviceInteractions']) {
          groups[addToGroup]['serviceInteractions'] = []
        }
        groups[addToGroup]['serviceInteractions'].push(interactionResult)
      }
    })
  }

  return groups
}

function getCriteriaFields () {
  return criteriaFields
}

function getCriteriaFromQuery (query) {
  const criteria = Object.keys(criteriaFields)
  for (var i = 0; i < criteria.length; i++) {
    const key = criteria[i]
    if (criteriaFields[key].queryName === query) {
      return criteriaFields[key]
    }
  }
}

module.exports = {
  loadCriteria,
  loadServices,
  getServiceGroups,
  getCriteriaFields,
  getCriteriaFromQuery
}
