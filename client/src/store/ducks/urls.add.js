import axios from 'axios'

import hostResolver from '../../lib/hostResolver'
import authHeader from '../../lib/authHeader'

import { addError, addSuccess, loadURLs, setFetching, clearFetching } from '../actions'

const host = hostResolver()

const SET = 'ricochet-web/activeUpdate/add/SET'
const CLEAR = 'ricochet-web/activeUpdate/add/CLEAR'

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

export const setAddingURL = () => ({ type: SET })
export const clearAddingURL = () => ({ type: CLEAR })

export const remoteAddURL = newURL => (dispatch) => {
  const { title, url } = newURL

  dispatch(setFetching())

  axios({
    method: 'POST',
    url: `${host}/url/`,
    headers: authHeader(),
    data: { title, url },
  })
    .then((response) => {
      dispatch(clearFetching())
      dispatch(addSuccess(`${response.data.title} added successfully.`))
      dispatch(loadURLs())
    })
    .catch((error) => {
      dispatch(addError(error.response.data.message))
      dispatch(clearFetching())
    })
}

export default reducer
