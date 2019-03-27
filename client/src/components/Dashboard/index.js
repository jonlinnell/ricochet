import { connect } from 'react-redux'

import DashboardView from './component'

import {
  loadClickCount,
  loadURLCount,
} from '../../store/actions'

const mapStateToProps = state => ({
  clicks: state.clicks.total,
  urls: state.urls.total,
})

const mapDispatchToProps = dispatch => ({
  loadURLCount() {
    dispatch(loadURLCount())
  },
  loadClickCount() {
    dispatch(loadClickCount())
  },
})

export default connect(mapStateToProps, mapDispatchToProps)(DashboardView)
