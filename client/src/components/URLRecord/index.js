import { connect } from 'react-redux'

import {
  setModifyURL,
  setDeletingURL,
  clearModifyURL,
  remoteModifyURL,
  remoteDeleteURL,
} from '../../store/actions'

import URLRecord from './component'

const mapStateToProps = state => ({
  modify: state.urls.activeUpdate.modify,
})

const mapDispatchToProps = dispatch => ({
  onSetModifyURL(id) {
    dispatch(setModifyURL(id))
  },

  onSelectDeleteURL(id) {
    dispatch(setDeletingURL(id))
  },

  onClearModifyURL() {
    dispatch(clearModifyURL())
  },

  onRemoteModifyURL(url) {
    dispatch(remoteModifyURL(url))
  },

  onDeleteURL(id) {
    dispatch(remoteDeleteURL(id))
  },
})

export default connect(mapStateToProps, mapDispatchToProps)(URLRecord)
