import React, { useEffect } from 'react'
import styled from 'styled-components'
import FontAwesomeIcon from '@fortawesome/react-fontawesome'
import { faTimes } from '@fortawesome/fontawesome-free-solid'


const Message = styled.p`
  margin: auto;
  font-size: 0.8rem;
  color: rgb(80, 80, 80);
  `

const NotificationWrapper = styled.div`
  display: flex;
  padding: 0.5rem;
  background-color: ${({ type }) => (
    type === 'ERROR'
      ? 'rgb(226, 172, 172)'
      : 'rgb(219, 239, 196)'
  )};
`

const Icon = styled.span`
  margin-left: 12px;
  `

export default ({ notification: { type, message, index }, clearNotification }) => {
  useEffect(() => {
    if (type === 'SUCCESS') {
      setTimeout(() => clearNotification(index), 5000)
    }
  }, [])

  return (
    <NotificationWrapper type={type}>
      <Message>{message}</Message>
      <Icon>
        <FontAwesomeIcon
          icon={faTimes}
          color="rgb(80, 80, 80)"
          onClick={() => clearNotification(index)}
        />
      </Icon>
    </NotificationWrapper>
  )
}
