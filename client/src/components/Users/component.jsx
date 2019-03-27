import React, { Component } from 'react'
import FontAwesomeIcon from '@fortawesome/react-fontawesome'
import { faUserPlus } from '@fortawesome/fontawesome-free-solid'

import ModalUpdateUserPassword from '../ModalUpdateUserPassword'
import ModalCreateUser from '../ModalCreateUser'
import UserRow from '../UserRow'

import { usersPropTypes } from '../../lib/propsValidation'

class Users extends Component {
  componentDidMount() {
    this.props.loadUserList()
  }

  render() {
    const { users, auth } = this.props

    let visibleUsers

    if (auth.user === 'admin' && auth.isAuthenticated) {
      visibleUsers = users.map(user => <UserRow user={user} key={user.username} />)
    } else {
      visibleUsers = users
        .filter(user => user.username !== 'admin')
        .map(user => <UserRow user={user} key={user.username} />)
    }

    return (
      <div className="card">
        <div className="card-header">
          Users
        </div>
        <div className="card-body">
          <div className="user-functions mb-3">
            <button
              className="btn btn-light"
              data-toggle="modal"
              data-target="#CreateUser"
            >
              <FontAwesomeIcon
                icon={faUserPlus}
                className="mr-2"
              />
              New user
            </button>
          </div>
          <table className="table">
            <thead>
              <tr>
                <th scope="col">Username</th>
                <th scope="col">Date Created</th>
                <th scope="col">Actions</th>
              </tr>
            </thead>
            <tbody>
              {visibleUsers}
            </tbody>
          </table>
        </div>

        <ModalUpdateUserPassword />
        <ModalCreateUser />
      </div>
    )
  }
}

Users.propTypes = usersPropTypes

export default Users
