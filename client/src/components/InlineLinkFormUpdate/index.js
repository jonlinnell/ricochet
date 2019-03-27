import { connect } from 'react-redux'

import { remoteModifyURL, clearModifyURL } from '../../store/actions'

import InlineLinkForm from '../InlineLinkForm/component'

const mapStateToProps = state => ({
  initialValues: state.urls.data.filter(i => i.id === state.urls.activeUpdate.modify.id)[0],
})

const mapDispatchToProps = dispatch => ({
  callback(url) {
    dispatch(clearModifyURL())
    dispatch(remoteModifyURL(url))
  },

  onCancel() {
    dispatch(clearModifyURL())
  },
})

export default connect(mapStateToProps, mapDispatchToProps)(InlineLinkForm)
