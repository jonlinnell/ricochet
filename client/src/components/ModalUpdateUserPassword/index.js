import { connect } from 'react-redux'

import { clearModifyUser, remoteModifyUser } from '../../store/actions'

import ModalModifyUserPassword from './component'

const mapStateToProps = state => ({
  initialValues: state.users.data
    .filter(user => user.id === state.users.activeUpdate.modify.id)[0],
})

const mapDispatchToProps = dispatch => ({
  onModifyUser(user) {
    dispatch(clearModifyUser())
    dispatch(remoteModifyUser(user))
  },
  onCancel() {
    dispatch(clearModifyUser())
  },
})

export default connect(mapStateToProps, mapDispatchToProps)(ModalModifyUserPassword)
