import { connect } from 'react-redux'

import { remoteDeleteUser } from '../../store/actions'

import ModalConfirmDeleteUser from './component'

const mapStateToProps = state => ({
  user: state.users.data
    .filter(user => user.username === state.users.activeUpdate.remove.username)[0],
})

const mapDispatchToProps = dispatch => ({
  onDeleteUser(username) {
    dispatch(remoteDeleteUser(username))
  },
})

export default connect(mapStateToProps, mapDispatchToProps)(ModalConfirmDeleteUser)
