import axios from 'axios'

import hostResolver from '../../lib/hostResolver'
import authHeader from '../../lib/authHeader'

import { addError, addSuccess, loadUserList, setFetching, clearFetching } from '../actions'

const host = hostResolver()

const SET = 'ricochet-web/users/activeUpdate/modify/SET'
const CLEAR = 'ricochet-web/users/activeUpdate/modify/CLEAR'

const reducer = (state = null, action) => {
  switch (action.type) {
    case SET:
      return Object.assign({}, state, {
        id: action.payload,
      })

    case CLEAR:
      return Object.assign({}, state, {
        id: null,
      })

    default:
      return state
  }
}

export const clearModifyUser = () => ({ type: CLEAR })

export const setModifyUser = id => ({
  type: SET,
  payload: id,
})

export const remoteModifyUser = updatedUser => (dispatch) => {
  const { id, password } = updatedUser

  dispatch(setFetching())

  axios({
    method: 'PUT',
    url: `${host}/auth/user/${id}/password`,
    headers: authHeader(),
    data: { password },
  })
    .then(() => {
      dispatch(clearFetching())
      dispatch(addSuccess('Password changed successfully.'))
      dispatch(loadUserList())
    })
    .catch((error) => {
      dispatch(addError(error.response.data.message))
      dispatch(clearFetching())
    })
}

export default reducer
