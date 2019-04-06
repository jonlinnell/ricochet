import React, { Component } from 'react'
import { Field, reduxForm } from 'redux-form'

import Modal from '../Modal'

let CreateUserForm = ({
  handleSubmit,
  pristine,
  submitting,
  onCancel,
  reset,
}) => (
  <form>
    <Field className="form-control" component="input" type="hidden" name="id" />
    <div className="modal-body">
      <div>
        <label htmlFor="username">Username</label>
        <Field
          className="form-control"
          component="input"
          name="username"
          placeholder="Username..."
        />
      </div>
      <div className="mt-4">
        <label htmlFor="password">Password</label>
        <Field
          className="form-control"
          component="input"
          type="password"
          name="password"
          placeholder="Password..."
        />
      </div>
    </div>
    <div className="modal-footer">
      <button
        type="submit"
        className="btn btn-primary"
        disabled={pristine || submitting}
        onClick={handleSubmit}
        data-dismiss="modal"
      >
        Create
      </button>
      <button
        type="button"
        className="btn btn-light"
        onClick={() => { reset(); onCancel() }}
        disabled={submitting}
        data-dismiss="modal"
      >
        Cancel
      </button>
    </div>
  </form>
)

CreateUserForm = reduxForm({
  form: 'createUser',
})(CreateUserForm)

class ModalCreateUser extends Component {
  constructor() {
    super()

    this.handleSubmit = this.handleSubmit.bind(this)
    this.onCancel = this.onCancel.bind(this)
  }

  onCancel() {
    this.props.onCancel()
  }

  handleSubmit(newUser) {
    this.props.onCreateUser(newUser)
  }

  render() {
    return (
      <Modal
        label="Create a new user"
        id="CreateUser"
      >
        <CreateUserForm
          initialValues={this.props.initialValues}
          onSubmit={this.handleSubmit}
          onCancel={this.onCancel}
        />
      </Modal>
    )
  }
}

export default ModalCreateUser
