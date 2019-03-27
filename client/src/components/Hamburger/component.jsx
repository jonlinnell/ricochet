import React from 'react'

import { hamburgerPropTypes } from '../../lib/propsValidation'

import './styles.css'

const Hamburger = (props) => {
  const {
    expanded,
    onClick,
  } = props

  return (
    // eslint-disable-next-line jsx-a11y/click-events-have-key-events
    <div className="navbar-toggler" data-toggle="collapse" data-target="#navbar" role="button" tabIndex={0} onClick={onClick}>
      <div id="hamburger" className={expanded ? 'open' : null}>
        <span />
        <span />
        <span />
        <span />
      </div>
    </div>
  )
}

Hamburger.propTypes = hamburgerPropTypes

export default Hamburger
