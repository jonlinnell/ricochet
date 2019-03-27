import React from 'react'

import './styles.css'

import { spinnerPropTypes } from '../../lib/propsValidation'

const Spinner = props =>
  (props.enabled
    ? <div className="loader" />
    : <div className="blank" />)

Spinner.propTypes = spinnerPropTypes

export default Spinner
