import React from 'react'
import { Redirect } from 'react-router-dom'
import { Field, reduxForm } from 'redux-form'

let LoginForm = ({
  pristine,
  submitting,
  handleSubmit,
  auth: {
    error,
  },
}) => (
  <div className="col-xs-12 col-sm-8 offset-sm-2 px-4 mt-5">
    <h1 className="display-4">Login</h1>
    <p className="text-secondary mb-3">You must log in to continue.</p>
    <form onSubmit={handleSubmit}>
      <div className="form-row">
        <div className="form-group col-sm-6">
          <Field className="form-control" component="input" type="text" name="username" placeholder="Username" />
        </div>
        <div className="form-group col-sm-6">
          <Field className="form-control" component="input" type="password" name="password" placeholder="Password" />
        </div>
      </div>
      <button type="submit" className="btn btn-primary btn-block px-1" disabled={pristine || submitting}>Login</button>
      {
        error
          ? <p className="alert alert-danger mb-0 mt-3 p-2" role="alert">{error.response ? error.response.data.message : 'Unable to connect to the server.'}</p>
          : null
      }
    </form>
  </div>
)

LoginForm = reduxForm({
  form: 'login',
})(LoginForm)

const Login = ({ onLogin, auth }) => (
  auth.isAuthenticated
    ? <Redirect to="/" />
    : <LoginForm onSubmit={credentials => onLogin(credentials)} auth={auth} />
)

export default Login
