import React from 'react'
import styled from 'styled-components'

import Notification from '../Notification'

const NotificationsWrapper = styled.div`
  max-width: 40vw;
  position: absolute;
  bottom: 12px;
  left: 12px;
  z-index: 2;
`

const Notifications = ({ notifications = [] }) => (
  <NotificationsWrapper>
    {
      notifications.map(notification =>
        <Notification notification={notification} key={notification.index} />)
    }
  </NotificationsWrapper>
)

export default Notifications
