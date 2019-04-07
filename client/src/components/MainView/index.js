import { connect } from 'react-redux'

import MainView from './component'

const mapStateToProps = state => ({
  auth: state.auth,
  fetching: state.fetching,
})

export default connect(mapStateToProps)(MainView)
