const SET = 'ricochet-web/fetching/SET'
const CLEAR = 'ricochet-web/fetching/CLEAR'

const reducer = (state = false, action) => {
  switch (action.type) {
    case SET:
      return true

    case CLEAR:
      return false

    default:
      return state
  }
}

export const setFetching = () => ({ type: SET })
export const clearFetching = () => ({ type: CLEAR })

export default reducer
