/* eslint-disable no-console */
require('dotenv').config()
const bcrypt = require('bcryptjs')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const express = require('express')
const fs = require('fs')
const morgan = require('morgan')
const path = require('path')
const rfs = require('rotating-file-stream')

const models = require('./models')
const { User } = require('./models')

const app = express()

const port = process.env.PORT || 3000

const logDir = path.join(__dirname, 'logs')
if (!fs.existsSync(logDir)) {
  fs.mkdirSync(logDir)
}

const accessLog = rfs('access.log', {
  interval: '1d',
  path: logDir
})

app.use(bodyParser.urlencoded({ extended: false }))
app.use(morgan('combined', { stream: accessLog }))
app.use(cookieParser())

/* Remember to filter fixed routes in the Joi schema */
require('./routes/auth')(app)
require('./routes/url')(app)

models.sequelize.sync().then(() => {
  console.log('Database connection established.')

  if (process.env.CREATE_DEFAULT_ADMIN) {
    User.findOne({
      where: { username: 'admin' },
      attributes: { exclude: ['password'] }
    })
      .then((user) => {
        if (!user) {
          const hashedPassword = bcrypt.hashSync(process.env.DEFAULTADMIN || 'not @ password', 8)

          User.create({
            username: 'admin',
            password: hashedPassword
          })
            .then(() => {
              console.log('Default admin account doesn\'t exist. Creating it.')
            })
        }
      })
  }

  require('./routes/redirects')(app)

  app.listen(port, () => { console.log(`Listening on ${port}`) })
})
