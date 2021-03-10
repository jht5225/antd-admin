import { history } from 'umi'
const { pathToRegexp } = require("path-to-regexp")
import api from 'api'
import store from 'store'
import { model } from 'utils/model'
import modelExtend from 'dva-model-extend'

const { changePassword } = api

export default modelExtend(model, {
  namespace: 'changePassword',

  state: {
      notice: '',
      notice_type: 'error',
  },
 
  effects: {
    *changePassword({ payload }, { put, call }) {
      const { success, message, type } = yield call(changePassword, payload)
      console.log(message)
      if(success){
          yield put({
              type: 'updateState',
              payload:{
                notice: message,
                notice_type: type
              }
          })
      }
      else{
        yield put({
            type: 'updateState',
            payload:{
              notice: message
            }
        })
      }
    },
  },
}
)
