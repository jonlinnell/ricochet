/* eslint-disable react/prop-types */
/* prop-types disabled in this file as the renderField component doesn't work yet */

import React, { Component } from 'react'
import { Field, reduxForm } from 'redux-form'

import Modal from '../Modal'

import {
  updateFormPropTypes,
  updateFormDefaultProps,
  modalUpdateUserPasswordPropTypes,
  modalUpdateUserPasswordDefaultProps,
} from '../../lib/propsValidation'

const validate = (values) => {
  const errors = {}

  if (values.password !== values.confirmPassword) {
    errors.confirmPassword = 'Passwords do not match'
  }

  return errors
}

const renderField = ({
  input,
  label,
  type,
  name,
  meta: { touched, error },
}) => (
  <div>
    <label htmlFor={name}>{label}</label>
    <div>
      <input {...input} placeholder={label} type={type} className="form-control" />
      <p className="text-danger">{touched && (error && <span>{error}</span>)}</p>
    </div>
  </div>
)

let UpdateForm = (props) => {
  const {
    handleSubmit,
    pristine,
    submitting,
    onCancel,
    reset,
  } = props

  return (
    <form>
      <Field className="form-control" component="input" type="hidden" name="id" />
      <div className="modal-body">
        <Field
          component={renderField}
          type="password"
          name="password"
          label="New password..."
        />
        <Field
          component={renderField}
          type="password"
          name="confirmPassword"
          label="Confirm password..."
        />
      </div>
      <div className="modal-footer">
        <button
          type="submit"
          className="btn btn-primary"
          disabled={pristine || submitting}
          data-dismiss="modal"
          onClick={handleSubmit}
        >
          Change
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
}

UpdateForm = reduxForm({
  form: 'passwordUpdate',
  validate,
})(UpdateForm)

class ModalUpdateUserPassword extends Component {
  constructor() {
    super()

    this.handleSubmit = this.handleSubmit.bind(this)
    this.onCancel = this.onCancel.bind(this)
  }

  onCancel() {
    this.props.onCancel()
  }

  handleSubmit(user) {
    this.props.onModifyUser(user)
  }

  render() {
    return (
      <Modal id="updateUserPassword" label="Change Password">
        <UpdateForm
          initialValues={this.props.initialValues}
          onSubmit={this.handleSubmit}
          onCancel={this.onCancel}
        />
      </Modal>
    )
  }
}

UpdateForm.propTypes = updateFormPropTypes
UpdateForm.modalUpdateUserPasswordDefaultProps = updateFormDefaultProps
ModalUpdateUserPassword.propTypes = modalUpdateUserPasswordPropTypes
ModalUpdateUserPassword.defaultProps = modalUpdateUserPasswordDefaultProps

export default ModalUpdateUserPassword
