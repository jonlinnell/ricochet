import React, { useState } from 'react'
import Snackbar from '@material-ui/core/Snackbar'
import Fade from '@material-ui/core/Fade'
import green from '@material-ui/core/colors/green'
import red from '@material-ui/core/colors/red'

const colours = {
  SUCCESS: { backgroundColor: green[400] },
  ERROR: { backgroundColor: red[400] },
}

const Notifications = ({ notifications = [], clearNotification }) => {
  const [open, setOpen] = useState(true)

  const handleClose = (index) => {
    setOpen(false)
    setTimeout(() => {
      clearNotification(index)
      setOpen(true)
    }, 1000)
  }

  return (
    <React.Fragment>
      {
        notifications.map(({ message, type, index }) => (
          <Snackbar
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'left',
            }}
            autoHideDuration={5000}
            ContentProps={{ style: colours[type] }}
            index={index}
            key={index}
            message={message}
            onClose={() => handleClose(index)}
            open={open}
            TransitionComponent={Fade}
          />
        ))
      }
    </React.Fragment>
  )
}

export default Notifications
