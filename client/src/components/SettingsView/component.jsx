import React from 'react'

import Spinner from '../Spinner'
import Users from '../Users'

import ModalConfirmDeleteUser from '../ModalConfirmDeleteUser'

const SettingsView = ({ fetching }) => (
  <div className="card-body">
    <h3 className="mb-3">Settings</h3>
    <Spinner enabled={fetching} />
    <Users />

    <ModalConfirmDeleteUser />
  </div>
)

export default SettingsView
