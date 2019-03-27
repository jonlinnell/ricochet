import { connect } from 'react-redux'

import { setModifyUser, clearModifyUser, setDeletingUser } from '../../store/actions'

import UserRow from './component'

const mapDispatchToProps = dispatch => ({
  onSetDeleteUser(username) {
    dispatch(setDeletingUser(username))
  },

  onSetModifyUser(id) {
    dispatch(clearModifyUser())
    dispatch(setModifyUser(id))
  },
})

const mapStateToProps = state => ({
  auth: state.auth,
})

export default connect(mapStateToProps, mapDispatchToProps)(UserRow)
