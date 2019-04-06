import React from 'react'
import posed, { PoseGroup } from 'react-pose'
import styled from 'styled-components'

import Notification from '../Notification'

const NotificationsWrapper = styled.div`
  position: sticky;
  top: 0;
  z-index: 1;
`

const AnimatedNotification = posed.div({
  enter: {
    opacity: 1,
  },
  exit: {
    opacity: 0,
  },
})

const Notifications = ({ notifications }) => (
  <NotificationsWrapper>
    <PoseGroup>
      {
        notifications.map(notification => (
          <AnimatedNotification key={notification.index}>
            <Notification notification={notification} />
          </AnimatedNotification>
        ))
      }
    </PoseGroup>
  </NotificationsWrapper>
)

Notifications.defaultProps = {
  notifications: [],
}

export default Notifications
