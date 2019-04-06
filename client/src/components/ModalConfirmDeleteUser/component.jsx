import React from 'react'

import Modal from '../Modal'

const ModalConfirmDeleteUser = ({ user: { username }, onDeleteUser }) => (
  <Modal id="confirmDeleteUser" label="Delete user">
    <div className="modal-body">
      Are you sure you want to delete {username}? Their URLs will not be deleted.
    </div>
    <div className="modal-footer">
      <button type="button" className="btn btn-secondary" data-dismiss="modal">Cancel</button>
      <button
        type="button"
        className="btn btn-danger"
        onClick={() => onDeleteUser(username)}
        data-dismiss="modal"
      >
        Delete
      </button>
    </div>
  </Modal>
)

ModalConfirmDeleteUser.defaultProps = { user: { username: null } }

export default ModalConfirmDeleteUser
