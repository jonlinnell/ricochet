import React from 'react'
import FontAwesomeIcon from '@fortawesome/react-fontawesome'
import leftPad from 'left-pad'

import {
  faTimes,
  faEdit,
} from '@fortawesome/fontawesome-free-solid'

const formatDate = (dateString) => {
  const date = new Date(dateString)
  return `${leftPad(date.getDate(), 2, '0')}-${leftPad(date.getMonth(), 2, '0')}-${date.getFullYear()}, ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`
}

const UserRow = (props) => {
  const { onSetDeleteUser, onSetModifyUser, auth } = props
  const { username, id, createdAt } = props.user

  return (
    <tr>
      <td>{username}</td>
      <td>{formatDate(createdAt)}</td>
      <td className="d-flex justify-content-end">
        <button
          className="btn btn-light"
          onClick={() => onSetModifyUser(id)}
          data-toggle="modal"
          data-target="#updateUserPassword"
        >
          <FontAwesomeIcon icon={faEdit} />
        </button>
        {
          username === 'admin' || username === auth.user
          ? null
          :
          <button
            className="btn btn-light"
            onClick={() => onSetDeleteUser(username)}
            data-toggle="modal"
            data-target="#confirmDeleteUser"
            tabIndex={0}
          >
            <FontAwesomeIcon icon={faTimes} />
          </button>
        }
      </td>
    </tr>
  )
}

export default UserRow
