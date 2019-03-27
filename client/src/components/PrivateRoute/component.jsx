import React from 'react'
import { Route, Redirect } from 'react-router-dom'

import { privateRoutePropTypes } from '../../lib/propsValidation'

const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={props => (
      localStorage.getItem('token')
        ? <Component {...props} />
        : <Redirect to={{ pathname: '/login' }} />
    )}
  />
)

PrivateRoute.propTypes = privateRoutePropTypes

export default PrivateRoute
