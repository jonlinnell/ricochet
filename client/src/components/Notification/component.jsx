import React from 'react'
import styled from 'styled-components'
import FontAwesomeIcon from '@fortawesome/react-fontawesome'
import { faTimes } from '@fortawesome/fontawesome-free-solid'

const Message = styled.p`
  margin: auto;
  color: rgb(80, 80, 80);
`

const NotificationWrapper = styled.div`
  display: flex;
  padding: 0.8rem;
  background-color: ${({ type }) => (
    type === 'ERROR'
      ? 'rgb(226, 172, 172)'
      : 'rgb(219, 239, 196)'
  )};
`

const Notification = ({ notification: { type, message, index }, clearNotification }) => {
  if (type === 'SUCCESS') {
    setTimeout(() => clearNotification(index), 5000)
  }

  return (
    <NotificationWrapper type={type}>
      <Message>{message}</Message>
      <span>
        <FontAwesomeIcon
          icon={faTimes}
          color="rgb(80, 80, 80)"
          onClick={() => clearNotification(index)}
        />
      </span>
    </NotificationWrapper>
  )
}

export default Notification
