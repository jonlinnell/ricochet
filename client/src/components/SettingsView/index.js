import { connect } from 'react-redux'

import SettingsView from './component'

const mapStateToProps = state => ({
  fetching: state.fetching,
})

export default connect(mapStateToProps)(SettingsView)
