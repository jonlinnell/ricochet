import axios from 'axios'

import authHeader from '../../lib/authHeader'
import hostResolver from '../../lib/hostResolver'

import history from '../../history'

const host = hostResolver()

const LOGIN_REQUEST = 'ricochet-web/auth/LOGIN_REQUEST'
const LOGIN_SUCCESS = 'ricochet-web/auth/LOGIN_SUCCESS'
const LOGIN_FAILURE = 'ricochet-web/auth/LOGIN_FAILURE'
const LOGOUT_SUCCESS = 'ricochet-web/auth/LOGOUT_SUCCESS'
const LOGOUT_REQUEST = 'ricochet-web/auth/LOGOUT_REQUEST'
const LOGOUT_FAILURE = 'ricochet-web/auth/LOGOUT_FAILURE'
const SESSION_FETCHING = 'ricochet-web/auth/SESSION_FETCHING'

const reducer = (state = {
  isFetching: false,
  isAuthenticated: localStorage.getItem('token') === false,
}, action) => {
  switch (action.type) {
    case LOGIN_REQUEST:
      return Object.assign({}, state, {
        isFetching: true,
        isAuthenticated: false,
        error: null,
        user: action.user,
      })

    case LOGIN_FAILURE:
      return Object.assign({}, state, {
        isFetching: false,
        isAuthenticated: false,
        user: null,
        error: action.error,
      })

    case LOGIN_SUCCESS:
      return Object.assign({}, state, {
        isFetching: false,
        isAuthenticated: true,
        user: action.user,
      })

    case SESSION_FETCHING:
      return Object.assign({}, state, {
        isFetching: true,
        isAuthenticated: false,
      })

    case LOGOUT_SUCCESS:
      return Object.assign({}, state, {
        isFetching: false,
        isAuthenticated: false,
        error: null,
        user: null,
      })

    default:
      return state
  }
}

export const loginRequest = user => ({
  type: LOGIN_REQUEST,
  user,
})

export const loginSuccess = user => ({
  type: LOGIN_SUCCESS,
  user,
})

export const loginFailure = error => ({
  type: LOGIN_FAILURE,
  error,
})

export const logoutRequest = () => ({ type: LOGOUT_REQUEST })
export const logoutSuccess = () => ({ type: LOGOUT_SUCCESS })
export const logoutFailure = () => ({ type: LOGOUT_FAILURE })

export const sessionResume = () => (dispatch) => {
  dispatch({ type: SESSION_FETCHING })

  axios({
    mathod: 'POST',
    headers: authHeader(),
    url: `${host}/auth/me`,
  })
    .then(response => dispatch(loginSuccess(response.data.username)))
    .catch(error => dispatch(loginFailure(error.response.data.message)))
}

export const login = credentials => (dispatch) => {
  dispatch(loginRequest(credentials.username))
  axios({
    method: 'POST',
    url: `${host}/auth/login`,
    data: credentials,
  })
    .then((response) => {
      localStorage.setItem('token', response.data.token)
      dispatch(loginSuccess(credentials.username))
    })
    .catch((error) => {
      dispatch(loginFailure(error))
    })
}

export const logout = () => (dispatch) => {
  dispatch(logoutRequest())
  localStorage.removeItem('token')
  localStorage.getItem('token')
    ? dispatch(logoutFailure())
    : dispatch(logoutSuccess())
  history.push('/')
}

export default reducer
