import { history } from 'umi'
const { pathToRegexp } = require("path-to-regexp")
import api from 'api'
import store from 'store'
import { configConsumerProps } from 'antd/lib/config-provider'

const { loginUser, logIn } = api

export default {
  namespace: 'login',

  state: {},
  // subscriptions: {
  //   setup({ dispatch, history }) {
  //     history.listen(location => {
  //       if (pathToRegexp('/login').exec(location.pathname)) {
  //       }
  //     })
  //   },
  // },
  effects: {
    *login({ payload }, { put, call, select }) {
      // const data = yield call(loginUser, payload)
      // console.log(data)
      const newData = yield call(logIn, payload)
      
      
      const { locationQuery } = yield select(_ => _.app)
      if (newData.success) {
        const { from } = locationQuery
        store.set('loggedIn', true)
        store.set('token', newData.token)
        yield put({ type: 'app/query' })
        if (!pathToRegexp('/login').exec(from)) {
          if (['', '/'].includes(from)) history.push('/dashboard')
          else history.push(from)
        } else {
          history.push('/dashboard')
        }
      } else {
        throw data
      }
    },
  },
}
