import React from 'react'

import Modal from '../Modal'

import { modalConfirmDeleteURLPropTypes, modalConfirmDeleteURLDefaultProps } from '../../lib/propsValidation'

const ModalConfirmDeleteURL = (props) => {
  const { id, title } = props.url

  return (
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
          onClick={() => props.onDeleteURL(id)}
          data-dismiss="modal"
        >
          Delete
        </button>
      </div>
    </Modal>
  )
}

ModalConfirmDeleteURL.propTypes = modalConfirmDeleteURLPropTypes
ModalConfirmDeleteURL.defaultProps = modalConfirmDeleteURLDefaultProps

export default ModalConfirmDeleteURL
