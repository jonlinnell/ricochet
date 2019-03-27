import axios from 'axios'

import hostResolver from '../../lib/hostResolver'
import authHeader from '../../lib/authHeader'

import { addError, addSuccess, loadURLs, setFetching, clearFetching } from '../actions'

const host = hostResolver()

const SET = 'ricochet-web/activeUpdate/modify/SET'
const CLEAR = 'ricochet-web/activeUpdate/modify/CLEAR'

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

export const clearModifyURL = () => ({ type: CLEAR })

export const setModifyURL = id => ({
  type: SET,
  payload: id,
})

export const remoteModifyURL = updatedUrl => (dispatch) => {
  const { id, title, url } = updatedUrl

  dispatch(setFetching())

  axios({
    method: 'PUT',
    url: `${host}/url/${id}`,
    headers: authHeader(),
    data: { title, url },
  })
    .then((response) => {
      dispatch(clearFetching())
      dispatch(addSuccess(`${response.data.title} modified successfully.`))
      dispatch(loadURLs())
    })
    .catch((error) => {
      dispatch(addError(error.response.data.message))
      dispatch(clearFetching())
    })
}

export default reducer
