const TOGGLE_HAMBURGER = 'ricochet-web/hamburger/TOGGLE_HAMBURGER'

const reducer = (state = false, action) => {
  switch (action.type) {
    case TOGGLE_HAMBURGER:
      return !state

    default:
      return state
  }
}

export const toggleHamburger = () => ({ type: TOGGLE_HAMBURGER })

export default reducer
