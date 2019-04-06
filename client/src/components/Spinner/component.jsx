import React from 'react'

import './styles.css'

const Spinner = ({ enabled }) =>
  (enabled
    ? <div className="loader" />
    : <div className="blank" />)

export default Spinner
