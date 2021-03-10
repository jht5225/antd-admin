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

//AUTH 

//Login
APIFunction.logIn = params => {
  
  return request({
    url: `${dataApi}/api-auth/`,
    data: params,
    method: 'post',
  })
}

//Users
APIFunction.users = params => {
  
  return request({
    url: `${dataApi}/api/users/`,
    data: params,
    
  })
}

//Change Password
APIFunction.changePassword = params => {
  
  return request({
    url: `${dataApi}/api/change-password/`,
    data: params,
    method: 'patch'
  })
}

//PRODUCTION 

//Overall Data 
APIFunction.prodData = params => {

  return request({
    url: `${dataApi}/api/performancedata/`,
    data: params,
  })
}

//Sites List
APIFunction.siteList = params => {
  return request({
    url: `${dataApi}/api/projects/`,
    data: params,
  })
}

//Sites Data 
APIFunction.siteData = params => {
  return request({
    url: `${dataApi}/api/new-daily-production/`,
    data: params,
  })
}


//ISSUES

//Issue List
APIFunction.issueList = params => {
  return request({
    url: `${dataApi}/api/issueslist/`,
    data: params,
  })
}

//Create Issue
APIFunction.issueCreate = params => {
  return request({
    url: `${dataApi}/api/issuesview/`,
    data: params,
    method: 'post',
  })
}

//Update Issue
APIFunction.issueUpdate = params => {
  return request({
    url: `${dataApi}/api/issuesview/`,
    data: params,
    method: 'post',
  })
}

//Close Issue
APIFunction.issueClose = params => {
  return request({
    url: `${dataApi}/api/closeissue/`,
    data: params,
    method: 'post',
  })
}

//Delete Issue
APIFunction.issueDelete = params => {
  return request({
    url: `${dataApi}/api/deleteissue/`,
    data: params,
    method: 'post',
  })
}

//PARTS

//Site Parts
APIFunction.siteParts = params => {
  return request({
    url: `${dataApi}/api/project-hardware/`,
    data: params,
  })
}

APIFunction.generatePurchaseOrder = params => {
  console.log(params)
  return request({
    url: `${dataApi}/api/purchase_order/`,
    data: params
  })
}


//ASSET MANAGEMENT

//Task List
APIFunction.queryTasks = params => {
  return request({
    url: `${apiPrefix}/assets/`,
    data: params,
  })
}

//Task Data
APIFunction.taskData = params => {
  return request({
    url: `${apiPrefix}/assets/`,
    data: params,
  })
}

//Task Calendar
APIFunction.taskCalendar = params => {
  return request({
    url: `${dataApi}/api/task-events-period/`,
    data: params,
  })
}

//Task Set
APIFunction.taskSetEvents = params => {
  return request({
    url: `${dataApi}/api/task-set-events/`,
    data: params,
  })
}

//Task Info
APIFunction.taskSetInfo = params => {
  return request({
    url: `${dataApi}/api/task-set-info/`,
    data: params,
  })
}

//Update Task Event
APIFunction.taskEventUpdate = params => {
  return request({
    url: `${dataApi}/api/task-event-update/`,
    data: params,
    method: 'post',
  })
}

//New Task
APIFunction.newTask = params => {
  return request({
    url: `${dataApi}/api/task-set-info/`,
    data: params,
    method: 'post',
  })
}

//Update Task Info
APIFunction.taskInfoUpdate = params => {
  return request({
    url: `${dataApi}/api/update-task-info/`,
    data: params,
    method: 'post',
  })
}

//Get Task Notes
APIFunction.taskNotes = params => {
  return request({
    url: `${dataApi}/api/task-comments/`,
    data: params,
    method: 'get',
  })
}

//Create Task Note
APIFunction.createTaskNote = params => {
  return request({
    url: `${dataApi}/api/create-task-note/`,
    data: params,
    method: 'post',
  })
}

//Get Task Activity
APIFunction.getTaskActivity = params => {
  return request({
    url: `${dataApi}/api/task-updates/`,
    data: params,
  })
}

export default APIFunction