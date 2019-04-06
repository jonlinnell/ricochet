import React from 'react'
import styled from 'styled-components'

const GuageWrapped = styled.div`
  text-align: center;
`

const Guage = ({ label, count }) => (
  <GuageWrapped className="mx-3">
    <h1>{ count }</h1>
    <p>{ label }</p>
  </GuageWrapped>
)

export default Guage
