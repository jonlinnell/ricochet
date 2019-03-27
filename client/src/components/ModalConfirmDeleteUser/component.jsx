import React from 'react'
import Modal from '../Modal'

import { modalConfirmDeleteUserPropTypes, modalConfirmDeleteUserDefaultProps } from '../../lib/propsValidation'

const ModalConfirmDeleteUser = (props) => {
  const { username } = props.user

  return (
    <Modal id="confirmDeleteUser" label="Delete user">
      <div className="modal-body">
        Are you sure you want to delete {username}? Their URLs will not be deleted.
      </div>
      <div className="modal-footer">
        <button type="button" className="btn btn-secondary" data-dismiss="modal">Cancel</button>
        <button
          type="button"
          className="btn btn-danger"
          onClick={() => props.onDeleteUser(username)}
          data-dismiss="modal"
        >
          Delete
        </button>
      </div>
    </Modal>
  )
}

ModalConfirmDeleteUser.propTypes = modalConfirmDeleteUserPropTypes
ModalConfirmDeleteUser.defaultProps = modalConfirmDeleteUserDefaultProps

export default ModalConfirmDeleteUser
