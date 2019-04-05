/* eslint-disable no-console */
require('dotenv').config()
const bcrypt = require('bcryptjs')
const bodyParser = require('body-parser')
const cors = require('cors')
const express = require('express')
const fs = require('fs')
const helmet = require('helmet')
const http = require('http')
const https = require('https')
const morgan = require('morgan')
const path = require('path')
const rfs = require('rotating-file-stream')

require('colors')

const models = require('./models')
const { User } = require('./models')

const routeAuth = require('./routes/auth')
const routeClicks = require('./routes/clicks')
const routeRedirects = require('./routes/redirects')
const routeUrl = require('./routes/url')

const app = express()

const {
  NODE_ENV, PORT, CREATE_DEFAULT_ADMIN, DEFAULT_ADMIN_PASSWORD, SSL_CERT, SSL_KEY
} = process.env

const logDir = path.join(__dirname, 'logs')
if (!fs.existsSync(logDir)) {
  fs.mkdirSync(logDir)
}

const accessLog = rfs('access.log', {
  interval: '1d',
  path: logDir
})

app.use(bodyParser.json())
app.use(cors())
app.use(helmet())
app.use(morgan('combined', { stream: accessLog }))

console.log(`Launching in ${NODE_ENV || 'development'} mode.`.cyan)

/* Remember to filter fixed routes in the Joi schema */
app.use('/auth', routeAuth)
app.use('/clicks', routeClicks)
app.use('/url', routeUrl)

app.get('/favicon.ico', (req, res) => res.send(204))

app.use('/', routeRedirects)

models.sequelize.sync().then(() => {
  console.log(`[${'DB'.bold}] Connection established.`.green)

  if (CREATE_DEFAULT_ADMIN) {
    User.findOne({
      where: { username: 'admin' },
      attributes: { exclude: ['password'] }
    })
      .then((user) => {
        if (!user) {
          const hashedPassword = bcrypt.hashSync(DEFAULT_ADMIN_PASSWORD || 'not @ password', 8)

          User.create({
            username: 'admin',
            password: hashedPassword
          })
            .then(() => {
              console.log('Default admin account doesn\'t exist. Creating it.'.yellow)
            })
        }
      })
  }

  if (NODE_ENV === 'production') {
    const options = {
      cert: fs.readFileSync(SSL_CERT),
      key: fs.readFileSync(SSL_KEY)
    }
    https.createServer(options, app).listen(PORT)
    console.log(`Service (https) started on ${PORT}.`.green)
  } else {
    http.createServer(app).listen(PORT)
    console.log(`Service (http) started on ${PORT}.`.green)
  }
})
