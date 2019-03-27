import axios from 'axios'
import { combineReducers } from 'redux'

import authHeader from '../../lib/authHeader'
import hostResolver from '../../lib/hostResolver'

import { addError, setFetching, clearFetching } from '../actions'

const host = hostResolver()

const UPDATE = 'ricochet-web/data/clicks/UPDATE_CLICKS'
const UPDATE_COUNT = 'ricochet-web/data/clicks/UPDATE_COUNT'

const data = (state = null, action) => {
  switch (action.type) {
    case UPDATE:
      return action.payload

    default:
      return state
  }
}

const total = (state = null, action) => {
  switch (action.type) {
    case UPDATE_COUNT:
      return action.payload

    default:
      return state
  }
}

export const loadClicks = () => (dispatch) => {
  dispatch(setFetching())

  axios({
    method: 'GET',
    url: `${host}/clicks`,
    headers: authHeader(),
  })
    .then((response) => {
      dispatch({
        type: UPDATE,
        payload: response.data,
      })
      dispatch(clearFetching())
    })
    .catch((error) => {
      dispatch(addError(error.response.data.message))
      dispatch(clearFetching())
    })
}

export const loadClickCount = () => (dispatch) => {
  axios({
    method: 'GET',
    url: `${host}/clicks/count`,
    headers: authHeader(),
  })
    .then(response => dispatch({
      type: UPDATE_COUNT,
      payload: response.data.count,
    }))
    .catch(error => dispatch(addError(error.response.data.message)))
}

export default combineReducers({
  data,
  total,
})
