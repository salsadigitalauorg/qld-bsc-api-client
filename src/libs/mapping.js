function getObjectProperty (object, name, fallback = null) {
  const items = name.split('.')
  let workingItem = object
  for (let i = 0; i < items.length; i++) {
    const prop = items[i]
    if (workingItem[prop] !== undefined && workingItem[prop] !== null) {
      workingItem = workingItem[prop]
    } else {
      workingItem = fallback
      break
    }
  }
  return workingItem
}

/**
 * Simplify result data fields for a full service.
 * @param {Array} data
 */
function fullServiceInteraction (data) {
  if (data.data && data.data.length > 0) {
    const item = data.data[0]
    const type = item.type.replace('node--', '')
    const attrs = item.attributes
    const service = {
      type: type,
      id: attrs.drupal_internal__nid,
      name: attrs.title,
      service_id: getObjectProperty(item, 'relationships.f_service.data.meta.drupal_internal__nid', ''),
      agency_service_id: getObjectProperty(attrs, 'f_agency_service_id', ''),
      do_it_online_url: getObjectProperty(attrs, 'f_do_it_online_url.uri', ''),
      fees: getObjectProperty(attrs, 'f_fees.processed', ''),
      form_url: getObjectProperty(attrs, 'f_form_url.uri', ''),
      how_to: getObjectProperty(attrs, 'f_how_to.processed', ''),
      in_person: getObjectProperty(attrs, 'f_in_person', ''),
      keywords: getObjectProperty(attrs, 'f_keywords', ''),
      long_description: getObjectProperty(attrs, 'f_long_description.processed', ''),
      more_information_url: getObjectProperty(attrs, 'f_more_information_url.uri', ''),
      old_qgs_id: getObjectProperty(attrs, 'f_old_qgs_id', ''),
      old_sir_id: getObjectProperty(attrs, 'f_old_sir_id', ''),
      prerequisites: getObjectProperty(attrs, 'f_prerequisites.processed', ''),
      business_unit_name: getObjectProperty(attrs, 'f_business_unit_name', ''),
      service_owner_name: getObjectProperty(attrs, 'f_service_owner_name', ''),
      service_owner_email: getObjectProperty(attrs, 'f_service_owner_email', ''),
      service_owner_status: getObjectProperty(attrs, 'f_service_owner_status', ''),
      service_date: getObjectProperty(attrs, 'f_service_date.value', ''),
      service_date_end: getObjectProperty(attrs, 'f_service_date.end_value', ''),
      service_status: getObjectProperty(attrs, 'f_service_status', ''),
      service_type: getObjectProperty(attrs, 'f_service_type', ''),
      service_validated_date: getObjectProperty(attrs, 'f_service_validated_date', ''),
      short_description: getObjectProperty(attrs, 'f_short_description', ''),
      who_do_i_call: getObjectProperty(attrs, 'f_who_do_i_call', ''),
      who_is_eligible: getObjectProperty(attrs, 'f_who_is_eligible.processed', ''),
      message_applied: getObjectProperty(attrs, 'f_message_applied.processed', ''),
      message_problem: getObjectProperty(attrs, 'f_message_problem.processed', ''),
      message_progress: getObjectProperty(attrs, 'f_message_progress.processed', ''),
      message_provisioned: getObjectProperty(attrs, 'f_message_provisioned.processed', ''),
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
        service['agency_name'] = getObjectProperty(agency, 'attributes.name', '')
        service['agency_type'] = getObjectProperty(agency, 'attributes.f_agency_type', '')
        service['agency_acronym'] = getObjectProperty(agency, 'attributes.f_agency_acronym', '')
        service['agency_website_url'] = getObjectProperty(agency, 'attributes.f_agency_website_url.uri', '')
      }
    }
    return service
  } else {
    return false
  }
}

/**
 * Simplify result data fields for Criteria
 * @param {Array} data
 */
function criteria (data) {
  if (data.data && data.data.length > 0) {
    const criteria = {}
    data.data.forEach(item => {
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
  } else {
    return false
  }
}

/**
 * Simplify result data fields for Service
 * @param {Array} data
 */
function service (data) {
  if (data.data && data.data.length > 0) {
    const services = []
    data.data.forEach(item => {
      services.push({
        tid: item.attributes.drupal_internal__tid,
        id: getObjectProperty(item, 'relationships.f_default_service_interaction.data.meta.drupal_internal__nid'),
        name: getObjectProperty(item, 'relationships.f_default_service_interaction.data.meta.label'),
        description: getObjectProperty(item, 'relationships.f_default_service_interaction.data.meta.f_short_description'),
      })
    })
    return services
  } else {
    return false
  }
}

/**
 * Simplify result data fields for Service Interactions
 * @param {Array} data
 */
function serviceInteraction (data) {
  if (data.data && data.data.length > 0) {
    const interactions = []
    data.data.forEach(item => {
      interactions.push({
        id: item.attributes.drupal_internal__nid,
        name: item.attributes.title,
        description: getObjectProperty(item, 'attributes.f_short_description'),
        service_id: getObjectProperty(item, 'relationships.f_service.data.meta.drupal_internal__tid'),
        service_label: getObjectProperty(item, 'relationships.f_service.data.meta.label')
      })
    })
    return interactions
  } else {
    return false
  }
}

module.exports = {
  criteria,
  service,
  fullServiceInteraction,
  serviceInteraction
}
