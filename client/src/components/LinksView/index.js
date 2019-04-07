import { connect } from 'react-redux'

import {
  loadURLs,
  loadClicks,
  setAddingURL,
  clearAddingURL,
  setURLFilter,
  clearURLFilter,
} from '../../store/actions'

import LinksView from './component'

const mapStateToProps = state => ({
  allURLs: state.urls.data,
  filter: state.urls.filter,
  activeUpdate: state.urls.activeUpdate,
})

const mapDispatchToProps = dispatch => ({
  loadURLs() {
    dispatch(loadURLs())
  },
  loadClicks() {
    dispatch(loadClicks())
  },
  onSetAddingURL() {
    dispatch(clearURLFilter())
    dispatch(setAddingURL())
  },
  handleSetFilter(filter) {
    dispatch(clearAddingURL())
    filter === ''
      ? dispatch(clearURLFilter())
      : dispatch(setURLFilter(filter))
  },
})

export default connect(mapStateToProps, mapDispatchToProps)(LinksView)
