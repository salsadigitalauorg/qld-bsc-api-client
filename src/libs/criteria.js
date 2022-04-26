/**
 * Filter Criteria
 * label: Display on the Profile page
 * queryName: Used in the URL on /results
 * filterName: Name of API field to query
 */
const criteriaFields = {
  criteria_age: {
    label: 'Age',
    queryName: 'age',
    filterName: 'f_c_age'
  },
  criteria_authentication_level: {
    label: 'Authentication level',
    queryName: 'auth',
    filterName: 'f_c_authentication_level'
  },
  criteria_business_sector: {
    label: 'Business sector',
    queryName: 'sector',
    filterName: 'f_c_business_sector'
  },
  criteria_card: {
    label: 'Cards',
    queryName: 'permits',
    filterName: 'f_c_card'
  },
  criteria_licences_permits: {
    label: 'Licenses and permits',
    queryName: 'permits',
    filterName: 'f_c_licences_permits'
  },
  criteria_housing: {
    label: 'Housing',
    queryName: 'housing',
    filterName: 'f_c_housing'
  },
  criteria_lifestage: {
    label: 'Lifestage',
    queryName: 'lifestage',
    filterName: 'f_c_lifestage'
  },
  criteria_work: {
    label: 'Work',
    queryName: 'work',
    filterName: 'f_c_work'
  },
  criteria_location: {
    label: 'Location',
    queryName: 'loc',
    filterName: 'f_c_location'
  },
  criteria_residency_status: {
    label: 'Residency status',
    queryName: 'residency',
    filterName: 'f_c_residency_status'
  }
}

/**
 * Get Filter Criteria mapping.
 */
function getCriteriaFields () {
  return criteriaFields
}

/**
 * Get Filter Criteria object from it's query.
 * @param {String} queryName The name of the query field.
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
  getCriteriaFields,
  getCriteriaFromQuery
}
