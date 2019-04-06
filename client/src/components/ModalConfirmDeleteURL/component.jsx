import React from 'react'

import Modal from '../Modal'

const ModalConfirmDeleteURL = ({ url: { id, title }, onDeleteURL }) => (
  <Modal
    label="Delete"
    id="confirmDeleteURL"
  >
    <div className="modal-body">
      Are you sure you want to delete {title}?
    </div>
    <div className="modal-footer">
      <button type="button" className="btn btn-secondary" data-dismiss="modal">Cancel</button>
      <button
        type="button"
        className="btn btn-danger"
        onClick={() => onDeleteURL(id)}
        data-dismiss="modal"
      >
        Delete
      </button>
    </div>
  </Modal>
)

ModalConfirmDeleteURL.defaultProps = {
  url: { id: null },
}

export default ModalConfirmDeleteURL
