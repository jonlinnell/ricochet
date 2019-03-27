import { connect } from 'react-redux'

import { remoteCreateUser } from '../../store/actions'

import ModalCreateUser from './component'

const mapStateToProps = null

const mapDispatchToProps = dispatch => ({
  onCreateUser(newUser) {
    dispatch(remoteCreateUser(newUser))
  },
  onCancel() {
  },
})

export default connect(mapStateToProps, mapDispatchToProps)(ModalCreateUser)
