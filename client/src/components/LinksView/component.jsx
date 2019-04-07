import React, { Component } from 'react'

import FontAwesomeIcon from '@fortawesome/react-fontawesome'
import { faPlus } from '@fortawesome/fontawesome-free-solid'

import posed, { PoseGroup } from 'react-pose'

import URLRecord from '../URLRecord'
import InlineLinkFormAdd from '../InlineLinkFormAdd'
import ModalConfirmDeleteURL from '../ModalConfirmDeleteURL'

import './styles.css'

const URLRecordAnimationWrapper = posed.div({
  enter: {
    opacity: 1,
  },
  exit: {
    opacity: 0,
    transition: { duration: 200 },
  },
})

class LinksView extends Component {
  componentWillMount() {
    this.props.loadURLs()
    this.props.loadClicks()
  }

  render() {
    const {
      activeUpdate,
      allURLs,
      filter,
      handleSetFilter,
      onSetAddingURL,
    } = this.props

    let filterInput
    const links = filter
      ? allURLs.filter(i => i.title.toLowerCase().match(filter.toLowerCase()))
      : allURLs

    return (
      <div className="card-body">
        <div className="w-100 d-flex justify-content-start align-items-center mb-2">
          <h3 className="m-0">Links</h3>
          <button className="btn btn-sm btn-outline-secondary ml-auto" onClick={onSetAddingURL}>
            <FontAwesomeIcon icon={faPlus} />
          </button>
        </div>
        <input
          name="filter"
          ref={input => filterInput = input} // eslint-disable-line no-return-assign
          onChange={() => handleSetFilter(filterInput.value)}
          className="form-control input-filter p-1 mt-2"
          placeholder="Filter links..."
        />
        <ul className="list-group list-group-flush list-urls col-sm-12 p-0">
          {activeUpdate.add
            ? <InlineLinkFormAdd />
            : null}
          <PoseGroup>
            {
              links.map(record => (
                <URLRecordAnimationWrapper key={record.id}>
                  <URLRecord url={record} />
                </URLRecordAnimationWrapper>
              ))
            }
          </PoseGroup>
          <ModalConfirmDeleteURL />
        </ul>
      </div>
    )
  }
}

LinksView.defaultProps = { allURLs: [] }

export default LinksView
