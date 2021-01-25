import { parse } from 'qs'
import modelExtend from 'dva-model-extend'
import api from 'api'
const { pathToRegexp } = require("path-to-regexp")
import { model } from 'utils/model'


const { queryDashboard, queryWeather, prodData } = api
const avatar = '//cdn.antd-admin.zuiidea.com/bc442cf0cc6f7940dcc567e465048d1a8d634493198c4-sPx5BR_fw236.jpeg'

export default modelExtend(model, {
  namespace: 'dashboard',
  state: {
    weather: {
      city: '深圳',
      temperature: '30',
      name: '晴',
      icon: '//cdn.antd-admin.zuiidea.com/sun.png',
    },
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
    dayname: "January 1st 0000",
    monthname: "January 0000",
    adjytdperf: 0,
    rawytdperf: 0,
    num_projects: 146,
    num_reporting: 0,
    worstmonthperfabs: [
      {
        name: "",
        diff: "0.00%",
        status: "Down",
        statuscolor: "Red"
      }
    ],
    worstmonthperf: [
      {
        name: "",
        variance: "0.00%",
        status: "Down",
        statuscolor: "Red"
      }
    ],
    worstyearperf: [
      {
        name: "",
        variance: "0.00%",
        status: "Down",
        statuscolor: "Red"
      }
    ],
    worstyearperfabs: [
      {
        name: "",
        diff: "0.00%",
        status: "Down",
        statuscolor: "Red"
      }
    ],
    downtimemonth: [
      {
        name: "",
        days: 0,
        lostrev: "$0.00",
        status: "Down",
        statuscolor: "Red"
      }
    ],
    downtimeyear: [
      {
        name: "",
        days: 0,
        lostrev: "$0.00",
        status: "Down",
        statuscolor: "Red"
      }
    ],
    irrvariance: [
      {
        name: '',
        stations: '0/0',
        month: "0.00%",
        year: "0.00%",
        rolling: "0.00%"
      }
    ],
    restofmonth:{
      perccomp: 0.00,
      rawvariance: 0.00,
      adjvariance: 0.00
    },
    restofyear:{
      perccomp: 0.00,
      rawvariance: 0.00,
      adjvariance: 0.00
    },
    rollingyear: {
      perccomp: 0.00,
      rawvariance: 0.00,
      adjvariance: 0.00
    },

  },
  subscriptions: {
    setup({ dispatch, history }) {
      history.listen(({ pathname }) => {
        if (
          pathToRegexp('/dashboard').exec(pathname) ||
          pathToRegexp('/').exec(pathname)
        ) {
          dispatch({ type: 'query' })
          dispatch({type: 'queryProdData'})
          
        }
      })
    },
  },
  effects: {
    *query({ payload }, { call, put }) {
      const data = yield call(queryDashboard, parse(payload))
      yield put({
        type: 'updateState',
        payload: data,
      })
    },
    *queryWeather({ payload = {} }, { call, put }) {
      payload.location = 'shenzhen'
      const result = yield call(queryWeather, payload)
      const { success } = result
      if (success) {
        const data = result.results[0]
        const weather = {
          city: data.location.name,
          temperature: data.now.temperature,
          name: data.now.text,
          icon: `//cdn.antd-admin.zuiidea.com/web/icons/3d_50/${data.now.code}.png`,
        }
        yield put({
          type: 'updateState',
          payload: {
            weather,
          },
        })
      }
    },
    *queryProdData({payload={}}, {call, put}){
      const res = yield call(prodData, payload)
      const { success, data } = res
      console.log(data)
      if (success){
        const perf = {
          dayname: data.dayname,
          monthname: data.monthname,
          adjytdperf: data.adjytdperf,
          rawytdperf: data.rawytdperf,
          num_projects: data.num_projects,
          num_reporting: data.num_reporting,
          worstmonthperfabs: data.worstmonthperfabs,
          worstmonthperf: data.worstmonthperf,
          worstyearperf: data.worstyearperf,
          worstyearperfabs: data.worstyearperfabs,
          downtimemonth: data.downtimemonth,
          downtimeyear: data.downtimeyear,
          irrvariance: data.irrvariance
        }
        yield put({
          type: "updateState",
          payload: data
        })
      }
    }
  },
})