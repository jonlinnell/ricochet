import { connect } from 'react-redux'

import {
  loadUserList,
} from '../../store/actions'

import Users from './component'

const mapStateToProps = state => ({
  users: state.users.data,
  auth: state.auth,
})

const mapDispatchToProps = dispatch => ({
  loadUserList() {
    dispatch(loadUserList())
  },
})

export default connect(mapStateToProps, mapDispatchToProps)(Users)
