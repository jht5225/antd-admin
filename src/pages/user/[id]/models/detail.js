const { pathToRegexp } = require("path-to-regexp")
import api from 'api'
import 'js-file-download'
const { siteList, siteData, issueCreate, issueList, siteParts, issueClose, generatePurchaseOrder, issueDelete} = api

export default {
  namespace: 'userDetail',

  state: {
    id: 0,
    data: {
      baseline_prod: [0,0,0,0,0,0,0,0,0,0,0,0],
    },
    baseline_comp: [],
    baseline:[],
    dates: [],
    values: [],
    avg_total_comp: 0,
    avg_total_val: 0,
    modalVisible: false,
    modalType: 'createIssue',
    issues: [],
    parts: {
      inverters: [{
        manufacturer__name:'',
      }],
      modules: [{
        manufacturer__name:'',
      }],
      racking:[{
        manufacturer__name:'',
      }],
      transformers: [{
        manufacturer__name:'',
      }],

    },
  },


  subscriptions: {
    setup({ dispatch, history }) {
      history.listen(({ pathname }) => {
        const match = pathToRegexp('/user/:id').exec(pathname)
        
        if (match) {

          dispatch({ type: 'query', payload: { id: match[1] } })
         
        }
      })
    },
  },

  effects: {
    *query({ payload }, { call, put }) {
      
      var today = new Date();
      var day = String(today.getDate()).padStart(2, '0');
      var month = String(today.getMonth()+1).padStart(2, '0');
      var year = today.getFullYear();
      var last_year = year - 1;
      const right_now = month + '/' + day + '/' + year;
      const year_ago = month + '/' + day + '/' + last_year;
      const id = payload.id
      const prod = yield call(siteData, payload={site_id:payload.id, start_date:year_ago, end_date:right_now})
      
      const issues = yield call(issueList, payload={project__id:id})
      
      const { list, ...other } = issues.list
      const parts = yield call(siteParts, payload)
      
      const data = yield call(siteList, payload={id:id})
      
      const { success, results } = data
      if (success) {
        yield put({
          type: 'updateState',
          payload: {
            data: results[0],
            id: payload.id,
            baseline_comp: prod.baseline_comp,
            dates: prod.dates,
            values: prod.values,
            avg_total_comp: prod.avg_total_comp,
            avg_total_val: prod.avg_total_val,
            baseline: prod.baseline_vals,
            parts: parts[0],
            issues: Object.values(other),

          },
        })
      } else {
        throw data
      }
    },
    *createPurchaseOrder({payload}, {call,put}){
      const { data, success } = yield call(generatePurchaseOrder, payload)
      if (success){
        yield put({type: 'hideModal'})
      }
    },
    *createIssue({payload}, { call, put }){
      const data = yield call(issueCreate, payload)
      if (data.success) {
        yield put({ type: 'hideModal' })
      } else {
        throw data
      }
    },
    *close({payload}, {call}){
      yield call(issueClose, payload)
    },
    *delete({payload}, {call}){
      yield call(issueDelete, payload)
    }
  }, 
  reducers: {
    updateState(state, { payload }) {
      return {
        ...state,
        ...payload,
      }
    },
    querySuccess(state, { payload }) {
      const { data } = payload
      return {
        ...state,
        data,
      }
    },
    showModal(state, { payload }) {
      return { ...state, ...payload, modalVisible: true }
    },
    showIssueModal(state, { payload }) {
      return { ...state, ...payload, modalType: "createIssue", modalmodalVisible: true }
    },
    showPurchaseOrderModal(state, { payload }) {
      return { ...state, ...payload, modalType: "createPurchaseOrder", modalmodalVisible: true }
    },
    hideModal(state) {
      return { ...state, modalVisible: false }
    },
      
  },
}
