import React from 'react'

import Users from '../Users'

import ModalConfirmDeleteUser from '../ModalConfirmDeleteUser'

const SettingsView = () => (
  <div className="card-body">
    <h3 className="mb-3">Settings</h3>
    <Users />

    <ModalConfirmDeleteUser />
  </div>
)

export default SettingsView
