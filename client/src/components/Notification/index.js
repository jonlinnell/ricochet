import { connect } from 'react-redux'

import Notification from './component'

import { clearNotification } from '../../store/actions'

const mapStateToProps = () => ({})

const mapDispatchToProps = dispatch => ({
  clearNotification(index) {
    dispatch(clearNotification(index))
  },
})

export default connect(mapStateToProps, mapDispatchToProps)(Notification)
