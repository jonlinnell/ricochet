import React, { PureComponent } from 'react'
import styled from 'styled-components'
import FontAwesomeIcon from '@fortawesome/react-fontawesome'
import { faTimes } from '@fortawesome/fontawesome-free-solid'

import { notificationPropTypes } from '../../lib/propsValidation'

const Message = styled.p`
  margin: auto;
  color: rgb(80, 80, 80);
`

const NotificationWrapper = styled.div`
  display: flex;
  padding: 0.8rem;
  background-color: ${props => (
    props.type === 'ERROR'
      ? 'rgb(226, 172, 172)'
      : 'rgb(219, 239, 196)'
  )};
`

class Notification extends PureComponent {
  componentDidMount() {
    if (this.props.notification.type === 'SUCCESS') {
      setTimeout(() => this.props.clearNotification(this.props.notification.index), 5000)
    }
  }

  render() {
    const {
      notification,
      clearNotification,
    } = this.props

    return (
      <NotificationWrapper type={notification.type}>
        <Message>{notification.message}</Message>
        <span>
          <FontAwesomeIcon
            icon={faTimes}
            color="rgb(80, 80, 80)"
            onClick={() => clearNotification(notification.index)}
          />
        </span>
      </NotificationWrapper>
    )
  }
}

Notification.propTypes = notificationPropTypes

export default Notification
