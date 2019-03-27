import { connect } from 'react-redux'

import { logout } from '../../store/actions'

import Navbar from './component'

const mapStateToProps = state => ({
  auth: state.auth,
})

const mapDispatchToProps = dispatch => ({
  onLogout() {
    dispatch(logout())
  },
})

export default connect(mapStateToProps, mapDispatchToProps, null, { pure: false })(Navbar)
