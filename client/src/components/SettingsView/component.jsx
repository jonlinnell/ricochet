import React from 'react'

import Spinner from '../Spinner'
import Users from '../Users'

import ModalConfirmDeleteUser from '../ModalConfirmDeleteUser'

import { settingsViewPropTypes } from '../../lib/propsValidation'

const SettingsView = (props) => {
  const { fetching } = props

  return (
    <div className="card-body">
      <h3 className="mb-3">Settings</h3>
      <Spinner enabled={fetching} />
      <Users />

      <ModalConfirmDeleteUser />
    </div>
  )
}

SettingsView.propTypes = settingsViewPropTypes

export default SettingsView
