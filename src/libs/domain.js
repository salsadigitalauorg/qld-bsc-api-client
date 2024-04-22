import settings from './settings'

export function getDomainSettings(routeQuery) {
  let domain = {}

  if (routeQuery.api && routeQuery.auth) {
    const auth = routeQuery.auth.split(':')
    domain = {
      url: routeQuery.api,
      auth: {
        username: auth[0],
        password: auth[1]
      }
    }
  }
  else {
    domain = settings.domain.master
  }
  return domain
}

export function getDomainQueryParams(routeQuery) {
  let params = {}
  if (routeQuery.api && routeQuery.auth) {
    params.api = routeQuery.api
    params.auth = routeQuery.auth
  }
  return params
}

export const getDomainParamNames = ['api', 'auth']

export default {
  getDomainSettings,
  getDomainQueryParams,
  getDomainParamNames
}
