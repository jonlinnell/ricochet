import axios from 'axios'

import authHeader from '../../lib/authHeader'
import hostResolver from '../../lib/hostResolver'

import { addError, addSuccess, loadUserList, setFetching, clearFetching } from '../actions'

const host = hostResolver()

const SET = 'ricochet-web/users/activeUpdate/remove/SET'
const CLEAR = 'ricochet-web/users/activeUpdate/remove/CLEAR'

const reducer = (state = null, action) => {
  switch (action.type) {
    case CLEAR:
      return Object.assign({}, state, {
        username: null,
      })

    case SET:
      return Object.assign({}, state, {
        username: action.payload,
      })

    default:
      return state
  }
}

export const setDeletingUser = username => ({
  type: SET,
  payload: username,
})

export const remoteDeleteUser = username => (dispatch) => {
  dispatch(setFetching())

  axios({
    method: 'DELETE',
    url: `${host}/auth/user/${username}`,
    headers: authHeader(),
  })
    .then(() => {
      dispatch({ type: CLEAR })
      dispatch(clearFetching())
      dispatch(addSuccess('User deleted.'))
      dispatch(loadUserList())
    })
    .catch((error) => {
      if (error.message) {
        dispatch(addError(error.response.data.message.details[0].message))
      } else {
        dispatch(addError(error.response.data.message))
      }
      dispatch(clearFetching())
      dispatch({ type: CLEAR })
    })
}

export default reducer
