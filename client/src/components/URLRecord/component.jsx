import React from 'react'
import FontAwesomeIcon from '@fortawesome/react-fontawesome'
import { faMousePointer, faCalendar } from '@fortawesome/fontawesome-free-solid'
import moment from 'moment-timezone'

moment.tz('Europe/London')

import InlineLinkFormUpdate from '../InlineLinkFormUpdate'

import { linkRecordPropTypes } from '../../lib/propsValidation'

import './styles.scss'

moment.tz('Europe/London')

const secondaryActionClasses = ['text-secondary', 'font-weight-light']
const linkActionClasses = [...secondaryActionClasses, 'link-action', 'ml-2']

const LinkRecord = (props) => {
  const {
    id,
    title,
    url,
    clicks,
    createdAt,
  } = props.url

  return props.modify.id === id
    ? <InlineLinkFormUpdate />
    :
    <li className="list-group-item">
      <div className="row d-flex align-items-center justify-content-start">
        <p className="col-sm-4 col-xs 12 text-title m-0 p-0">{title}</p>
        <a
          className="col-sm-8 col-xs-12 m-0 p-0 text-url"
          href={url}
          title={url}
          target="_blank"
          rel="noopener noreferrer"
        >
          {url}
        </a>
      </div>
      <div className="row d-flex align-items-center justify-content-end mt-2">
        <div className={[...secondaryActionClasses, 'm-0', 'mr-auto', 'click-count'].join(' ')}>
          {clicks ? <span className="mr-3"><FontAwesomeIcon className="mr-0 fa-info" icon={faMousePointer} /> {clicks}</span> : null}
          <span><FontAwesomeIcon className="mr-1 fa-info" icon={faCalendar} />{moment(createdAt).format('LLL')}</span>
        </div>
        <button
          className={linkActionClasses.join(' ')}
          onClick={() => props.onSetModifyURL(id)}
          tabIndex={0}
        >
            Modify
        </button>
        <button
          className={linkActionClasses.join(' ')}
          tabIndex={-1}
        >
            Stats
        </button>
        <button
          className={linkActionClasses.join(' ')}
          onClick={() => props.onSelectDeleteURL(id)}
          data-toggle="modal"
          data-target="#confirmDeleteURL"
          tabIndex={-1}
        >
            Delete
        </button>
      </div>
    </li>
}

LinkRecord.propTypes = linkRecordPropTypes

export default LinkRecord
