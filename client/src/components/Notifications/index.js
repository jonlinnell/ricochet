import { connect } from 'react-redux'

import { clearNotification } from '../../store/actions'

import Notifications from './component'

const mapStateToProps = state => ({
  notifications: state.notifications,
})

const mapDispatchToProps = dispatch => ({
  clearNotification(index) {
    dispatch(clearNotification(index))
  },
})

export default connect(mapStateToProps, mapDispatchToProps)(Notifications)
