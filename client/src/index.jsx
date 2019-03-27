import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'

import 'jquery'
import 'bootstrap/dist/js/bootstrap.min'

import './styles/main.scss'

import storeCreator from './store'
import {
  login,
  logout,
  sessionResume,
} from './store/actions'

import MainView from './components/MainView'

const store = storeCreator()

if (process.env.NODE_ENV === 'development') {
  window.store = store
  window.login = login
  window.logout = logout
}

if (localStorage.getItem('token')) {
  store.dispatch(sessionResume())
}

render(
  <Provider store={store}>
    <MainView />
  </Provider>,
  document.getElementById('root'),
)
