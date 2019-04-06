import React from 'react'

const Modal = ({ id, label, children }) => (
  <div className="modal fade" id={id} tabIndex="-1" role="dialog">
    <div className="modal-dialog" role="document">
      <div className="modal-content">
        <div className="modal-header">
          <h5 className="modal-title">{label}</h5>
          <button type="button" className="close" data-dismiss="modal">
            <span>&times;</span>
          </button>
        </div>
        {children}
      </div>
    </div>
  </div>
)

export default Modal
