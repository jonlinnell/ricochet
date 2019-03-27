import { applyMiddleware, createStore, combineReducers } from 'redux'
import { reducer as formReducer } from 'redux-form'
import thunk from 'redux-thunk'

import defaultInitialState from './initialState.json'

import auth from './ducks/auth'
import notifications from './ducks/notifications'
import fetching from './ducks/fetching'
import urls from './ducks/urls'
import users from './ducks/users'
import clicks from './ducks/clicks'

import hamburger from './ducks/hamburger'

const appReducer = combineReducers({
  notifications,
  auth,
  clicks,
  fetching,
  form: formReducer,
  hamburger,
  urls,
  users,
})

export default (initialState = defaultInitialState) =>
  applyMiddleware(thunk)(createStore)(appReducer, initialState)
