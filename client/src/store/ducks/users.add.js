import axios from 'axios'

import hostResolver from '../../lib/hostResolver'
import authHeader from '../../lib/authHeader'

import { addError, addSuccess, loadUserList, setFetching, clearFetching } from '../actions'

const host = hostResolver()

const SET = 'ricochet-web/activeUpdate/addUser/SET'
const CLEAR = 'ricochet-web/activeUpdate/addUser/CLEAR'

const reducer = (state = null, action) => {
  switch (action.type) {
    case SET:
      return true

    case CLEAR:
      return false

    default:
      return state
  }
}

export const setCreatingUser = () => ({ type: SET })
export const clearCreatingUser = () => ({ type: CLEAR })

export const remoteCreateUser = newUser => (dispatch) => {
  const { username, password } = newUser

  dispatch(setFetching())

  axios({
    method: 'POST',
    url: `${host}/auth/register`,
    headers: authHeader(),
    data: { username, password },
  })
    .then((response) => {
      dispatch(clearFetching())
      dispatch(addSuccess(`New user ${response.data.username} added successfully.`))
      dispatch(loadUserList())
    })
    .catch((error) => {
      dispatch(addError(error.response.data.message))
      dispatch(clearFetching())
    })
}

export default reducer
