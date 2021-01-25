import request from 'utils/request'
import { apiPrefix, dataApi } from 'utils/config'

import api from './api'

const gen = params => {
  let url = apiPrefix + params
  let method = 'GET'

  const paramsArray = params.split(' ')
  if (paramsArray.length === 2) {
    method = paramsArray[0]
    url = apiPrefix + paramsArray[1]
  }

  return function(data) {
    return request({
      url,
      data,
      method,
    })
  }
}

const APIFunction = {}
for (const key in api) {
  APIFunction[key] = gen(api[key])
}

APIFunction.queryWeather = params => {
  
  params.key = 'i7sau1babuzwhycn'
  return request({
    url: `${apiPrefix}/weather/now.json`,
    data: params,
  })
}

//Auth calls
APIFunction.logIn = params => {
  
  return request({
    url: `${dataApi}/api-auth/`,
    data: params,
    method: 'post',
  })
}

APIFunction.users = params => {
  
  return request({
    url: `${dataApi}/api/users/`,
    data: params,
    
  })
}

//Prod data calls 
APIFunction.prodData = params => {

  return request({
    url: `${dataApi}/api/performancedata/`,
    data: params,
  })
}
export default APIFunction
