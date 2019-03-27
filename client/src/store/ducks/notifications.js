const ADD = 'ricochet-web/notifications/ADD'
const CLEAR = 'ricochet-web/notifications/CLEAR'

const reducer = (state = null, action) => {
  switch (action.type) {
    case ADD:
      return [
        ...state,
        {
          message: action.payload.message,
          type: action.payload.type,
          index: state.length + 1,
        },
      ]
    case CLEAR:
      return state.filter(notification => notification.index !== action.payload)

    default:
      return state
  }
}

export const addError = error =>
  ({
    type: ADD,
    payload: {
      message: error,
      type: 'ERROR',
    },
  })

export const addSuccess = success =>
  ({
    type: ADD,
    payload: {
      message: success,
      type: 'SUCCESS',
    },
  })

export const clearNotification = index =>
  ({
    type: CLEAR,
    payload: index,
  })

export default reducer
