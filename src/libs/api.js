const axios = require('axios')

// Service Content API
const domain = 'https://nginx-php-qld-bsc-master.au.amazee.io/'
const auth = {
  username: 'bsc',
  password: 'bsc2020'
}

/**
 * Filter Criteria
 * label: Display on the Profile page
 * queryName: Used in the URL on /results
 * fieldName: Name of API field to query
 */
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

/**
 * Generate an API url for services.
 * Includes f_agency field by default.
 * Filters is an Array with 3 types:
 *   Taxonomy:    { field: 'f_criteria_age', value: '6' }   => filter[f_criteria_age.tid][value]=6`
 *   General:     { filter: 'nid', value: '10' }            => filter[nid][value]=10
 *   Pagination:  { page: 'offset', value: '10' }           => page[offset]=10
 * @param {Array} filters Taxonomy: { field, value }, General: { filter, value }, Pagination: { page, value }
 */
function buildUrl(filters) {
  let queries = []

  queries.push(`include=f_agency`)

  if (filters) {
    filters.forEach(filter => {
      if (filter.value && filter.value !== '') {
        if (filter.field) {
          queries.push(`filter[${filter.field}.tid][value]=${filter.value}`)
        } else if (filter.filter) {
          queries.push(`filter[${filter.filter}][value]=${filter.value}`)
        } else if (filter.page) {
          queries.push(`page[${filter.page}]=${filter.value}`)
        }
      }
    })
  }

  return `${domain}api/v1/services?${queries.join('&')}`
}

/**
 * Perform request to the API.
 * @param {String} url
*/
async function request (url) {
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
 * Returns the concatenated result list.
 * Does not return includes / links / etc.
 * @param {String} url
 */
async function recursiveRequest (url) {
  const result = await request(url)
  if (result.data && result.data.links && result.data.links.next && result.data.links.next.href) {
    const next = await recursiveRequest(result.data.links.next.href)
    return [...result.data.data, ...next]
  } else {
    return result.data.data
  }
}

/**
 * Loads all filter criteria.
 * Returns an object with criteria names as keys, and arrays as values.
 */
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

/**
 * Simplify result data fields into a service for Client.
 * @param {Object} data
 */
function getFullServiceFromAPIData (data) {
  const item = data.data[0]
  const type = item.type.replace('node--', '')
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
    for (var i = 0; i < data.included.length; i++) {
      const includeItem = data.included[i]
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
  return service
}

/**
 * Get Service listing from a Service result.
 * @param {Object} item result from data array. { attributes: { drupal_internal__nid, title, f_short_description } }
 */
function getServiceFromResultItem (item) {
  return {
    id: item.attributes.drupal_internal__nid,
    name: item.attributes.title,
    description: item.attributes.f_short_description ? item.attributes.f_short_description : ''
  }
}

/**
 * Get Service Interaction listing from a Service Interaction result.
 * @param {Object} item result from data array. { attributes: { drupal_internal__nid, title, f_short_description } }
 */
function getInteractionFromResultItem (item) {
  return getServiceFromResultItem(item) // Interactions use the same field as services
}

/**
 * Get Service listing from a Service Interaction result.
 * @param {Object} item result from data array. { relationships: { f_service, title, f_short_description } }
 */
function getServiceFromInteractionRelationship (item) {
  return {
    id: item.relationships.f_service ? item.relationships.f_service.data.meta.drupal_internal__nid : '',
    name: item.relationships.f_service ? item.relationships.f_service.data.meta.label : '',
    description: item.relationships.f_service ? item.relationships.f_service.data.meta.f_short_description : ''
  }
}

/**
 * Check for available data from an Axios result.
 * @param {Object} apiResult axios result
 */
function getAPIData (apiResult) {
  return (apiResult && apiResult.data && apiResult.data.data && apiResult.data.data.length > 0) ? apiResult.data.data : false
}

/**
 * Load services from API given an array of filters.
 * Filters is an Array with 3 types:
 *   Taxonomy:    { field: 'f_criteria_age', value: '6' }   => filter[f_criteria_age.tid][value]=6`
 *   General:     { filter: 'nid', value: '10' }            => filter[nid][value]=10
 *   Pagination:  { page: 'offset', value: '10' }           => page[offset]=10
 * @param {Array} filters Taxonomy: { field, value }, General: { filter, value }, Pagination: { page, value }
 */
async function loadServices (filters) {
  const result = await request(buildUrl(filters))
  const results = getAPIData(result)

  if (results) {
    const services = {}
    const interactions = []

    // Get all services
    results.forEach(item => {
      const type = item.type.replace('node--', '')
      let service = null

      if (type === 'service') {
        service = getServiceFromResultItem(item)
      } else if (type === 'service_interaction') {
        service = getServiceFromInteractionRelationship(item)
        interactions.push(item)
      }

      // Create a new service
      if (services[service.id] === undefined) {
        service.interactions = []
        services[service.id] = service
      }
    })

    // Move interactions into their parent services
    interactions.forEach(interaction => {
      const parentServiceId = interaction.relationships.f_service ? interaction.relationships.f_service.data.meta.drupal_internal__nid : false
      if (parentServiceId) {
        services[parentServiceId].interactions.push(getInteractionFromResultItem(interaction))
      }
    })

    return {
      totalCount: result.data.meta.count,
      services: Object.keys(services).map(key => services[key])
    }
  }
  return false
}

/**
 * Load a Service / Service Interaction from API given an id.
 * @param {String} id Node Id of Service / Service Interaction
 */
async function loadFullService (id) {
  if (id) {
    const result = await request(buildUrl([{ filter: 'nid', value: id }]))
    const results = getAPIData(result)
    return (results) ? getFullServiceFromAPIData(result.data) : false
  }
  return false
}

/**
 * Get Filter Criteria mapping.
 */
function getCriteriaFields () {
  return criteriaFields
}

/**
 * Get Filter Criteria object from it's query.
 */
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
  loadFullService,
  getCriteriaFields,
  getCriteriaFromQuery
}
