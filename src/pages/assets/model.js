import { parse } from 'qs'
import modelExtend from 'dva-model-extend'
import api from 'api'
const { pathToRegexp } = require("path-to-regexp")
import { model } from 'utils/model'

 
const { queryDashboard, queryTasks, taskCalendar, getTaskActivity, taskSetInfo, } = api
const avatar = '//cdn.antd-admin.zuiidea.com/bc442cf0cc6f7940dcc567e465048d1a8d634493198c4-sPx5BR_fw236.jpeg'

export default modelExtend(model, {
  namespace: 'assets',
  state: {
    activity: [{
      full_text: '',
      user: '',
      task_set: 1,
      update_time: '',
    }],
    sales: [],
    quote: {
      avatar,
    },
    numbers: [],
    recentSales: [],
    comments: [],
    completed: [],
    browser: [],
    cpu: {},
    user: {
      avatar,
    },
    tasks: [],
    task:[{
      projects: [{
        id: 0,
        name: '',
      }],
      frequency: '',
      info: {
        type: '',
        annual_min: 0,
        escalator: 0,
        first_renew: '',
        rate_kwh: 0,
        sched: null,
        start_amount: 0,
        start_date: '',
        type: ''
      },
      main_priority_event: {
        date: '',
        amount: 0,
        sched_update: false,
        entered: false,
        paid: false,
        posted: false,
      },
      event_data: [
        {
          month: 1,
          complete: 1,
          incomplete: 1,
      }
    ]
    }],
  },
  subscriptions: {
    setup({ dispatch, history }) {
      history.listen(({ pathname }) => {
        if (
          pathToRegexp('/assets').exec(pathname) 
        ) {
          dispatch({ type: 'query' })
          
        }
      })
    },
  },
  effects: {
    *query({ payload }, { call, put }) {
      const data = yield call(queryDashboard, parse(payload))
      const task = yield call(taskSetInfo,payload)
      const { event_data } = yield call(taskCalendar, payload)
      const activity = yield call(getTaskActivity, payload)
      console.log(activity)
      event_data.sort(function(a,b){
        return a.month - b.month
      })
      console.log(task)
      yield put({
        type: 'updateState',
        payload: {
          activity: activity.results,
          ...data,

        }
      })
      yield put({
        type: 'updateState',
        payload: {task: task.list, event_data: event_data}
      })
      const tasks = yield call(queryTasks, parse(payload))
      
      yield put({
        type: 'updateState',
        payload: {tasks: tasks},
      })
    },
    *updateTaskList({ payload }, { call, put }) {
      const task_list = yield call(taskSetInfo, payload)
      yield put({
        type: 'updateState',
        payload: {task: task_list.list}
      })
    }

  },
})