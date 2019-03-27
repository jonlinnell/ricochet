import React from 'react'
import styled from 'styled-components'
import propTypes from 'prop-types'

const GuageWrapped = styled.div`
  text-align: center;
`

const Guage = ({ label, count }) => (
  <GuageWrapped className="mx-3">
    <h1>{ count }</h1>
    <p>{ label }</p>
  </GuageWrapped>
)

Guage.propTypes = {
  count: propTypes.number.isRequired,
  label: propTypes.string.isRequired,
}

export default Guage
