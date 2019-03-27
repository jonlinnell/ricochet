import { connect } from 'react-redux'

import MainView from './component'

const mapStateToProps = state => ({
  errors: state.errors,
  auth: state.auth,
})

export default connect(mapStateToProps)(MainView)
