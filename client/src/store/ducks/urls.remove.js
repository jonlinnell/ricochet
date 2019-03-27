import axios from 'axios'

import authHeader from '../../lib/authHeader'
import hostResolver from '../../lib/hostResolver'

import { addError, addSuccess, loadURLs, setFetching, clearFetching } from '../actions'

const host = hostResolver()

const SET = 'ricochet-web/activeUpdate/remove/SET'
const CLEAR = 'ricochet-web/activeUpdate/remove/CLEAR'

const reducer = (state = null, action) => {
  switch (action.type) {
    case CLEAR:
      return Object.assign({}, state, {
        id: null,
      })

    case SET:
      return Object.assign({}, state, {
        id: action.payload,
      })

    default:
      return state
  }
}

export const setDeletingURL = id => ({
  type: SET,
  payload: id,
})

export const remoteDeleteURL = id => (dispatch) => {
  dispatch(setFetching())

  axios({
    method: 'DELETE',
    url: `${host}/url/${id}`,
    headers: authHeader(),
  })
    .then(() => {
      dispatch({ type: CLEAR })
      dispatch(clearFetching())
      dispatch(addSuccess('Link deleted.'))
      dispatch(loadURLs())
    })
    .catch((error) => {
      dispatch(addError(error.response.data.message))
      dispatch(clearFetching())
      dispatch({ type: CLEAR })
    })
}

export default reducer
