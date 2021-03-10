const { pathToRegexp } = require("path-to-regexp")
import api from 'api'
import store from 'store'
import 'js-file-download'
const { taskSetInfo, taskEventUpdate, taskInfoUpdate, getTaskActivity, users, taskNotes, createTaskNote } = api

export default {
  namespace: 'assetDetail',

  state: {
    modalType: '',
    modalVisible: false,
    event: true,
    id: 0,
    type: "lease",
    user_assigned:  'Not Assigned',
    activity: [{
      full_text: '',
      user: '',
      task_set: 1,
      update_time: '',
    }],
    users: [
      {
        id: 0,
        username: 0,
        email: 0,
        
      },
    ],
    notes: [],
    alert_days: 7,
    frequency: "quarter",
    info: {
      annual_min: null,
      escalator: null,
      first_renew: "2013-09-21",
      rate_kwh: null,
      sched: null,
      start_amount: 10000,
      start_date: "2012-09-21",
      type: "static",
    },
    main_priority_event: {
      alert: false,
      amount: 2500,
      date: "2021-04-01",
      entered: null,
      is_complete: false,
      overdue: false,
      paid: null,
      posted: null,
      sched_update: false,
    },
    projects: [
      {
        id: 0,
        name: '',
      }
    ],
    vendors: [{
      id: 0,
      name: '',
    }]
  },


  subscriptions: {
    setup({ dispatch, history }) {
      history.listen(({ pathname }) => {
        const match = pathToRegexp('/assets/:id').exec(pathname)
        
        if (match) {

          dispatch({ type: 'query', payload: { id: match[1] } })
         
        }
      })
    },
  },

  effects: {
    *query({ payload }, { call, put }) {
      const id = payload.id
      const id_2 = payload.id //Can't tell you why this is needed but it is
      const data = yield call(taskSetInfo, payload={pk:payload.id})
      console.log(data)
      const { results } = yield call(users, payload={})
      const notes = yield call(taskNotes, payload={pk: id})
      const activity = yield call(getTaskActivity, payload={pk: id_2})
      if (data.success) {
        yield put({
          type: 'updateState',
          payload: {
            id: data[0].id,
            type: data[0].type,
            user_assigned: data[0].user_assigned,
            alert_days: data[0].alert_days,
            frequency: data[0].frequency,
            info: data[0].info,
            vendors: data[0].vendors,
            main_priority_event: data[0].main_priority_event,
            projects: data[0].projects,
            users: results,
            notes: notes.list,
            activity: activity.results,

          },
        })
      } else {
        throw data
      }
    },
    *newNote({payload}, {call,put}){
      const { data, success } = yield call(generatePurchaseOrder, payload)
      if (success){
        yield put({type: 'hideModal'})
      }
    },
    *editEvent({payload}, { call, put }){

      const data = yield call(taskEventUpdate, payload)
      if (data.success) {
        yield put({ type: 'hideModal' })
      } else {
        throw data
      }
    },
    *editInfo({payload}, { call, put }){
      const data = yield call(taskInfoUpdate, payload)
      if (data.success) {
        yield put({ type: 'hideModal' })
      } else {
        throw data
      }
    },
    *createNote({payload}, { call, put }){
      const user = store.get('user')
      payload.username = user.username
      const data = yield call(createTaskNote, payload)
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
      return { ...state, ...payload, modalType: "createIssue", modalVisible: true }
    },
    showEventModal(state, { payload }) {
      return { ...state, ...payload, modalType: "editEvent", modalVisible: true }
    },
    hideModal(state) {
      return { ...state, modalVisible: false }
    },
      
  },
}
