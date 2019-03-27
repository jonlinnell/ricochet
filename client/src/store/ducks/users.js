import axios from 'axios'
import { combineReducers } from 'redux'

import authHeader from '../../lib/authHeader'
import hostResolver from '../../lib/hostResolver'

import remove from './users.remove'
import modify from './users.modify'

import { addError, setFetching, clearFetching } from '../actions'

const host = hostResolver()

const UPDATE = 'ricochet-web/users/data/UPDATE_USERS'

const FILTER = 'ricochet-web/users/filter/FILTER'
const CLEAR_FILTER = 'ricochet-web/users/filter/CLEAR_FILTER'

export const setFilter = filter => ({ type: FILTER, payload: filter })

export const clearFilter = () => ({ type: CLEAR_FILTER })

const data = (state = null, action) => {
  switch (action.type) {
    case UPDATE:
      return action.payload

    default:
      return state
  }
}

const filter = (state = null, action) => {
  switch (action.type) {
    case FILTER:
      return action.payload

    case CLEAR_FILTER:
      return null

    default:
      return state
  }
}

export const loadUserList = () => (dispatch) => {
  dispatch(setFetching())

  axios({
    method: 'GET',
    url: `${host}/auth/user`,
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

export default combineReducers({
  activeUpdate: combineReducers({
    modify,
    remove,
  }),
  data,
  filter,
})
