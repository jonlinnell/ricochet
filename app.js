/* eslint-disable no-console */
require('dotenv').config()
const bcrypt = require('bcryptjs')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const cors = require('cors')
const express = require('express')
const fs = require('fs')
const helmet = require('helmet')
const http = require('http')
const https = require('https')
const morgan = require('morgan')
const path = require('path')
const rfs = require('rotating-file-stream')

const models = require('./models')
const { User } = require('./models')

const redirector = express()
const app = express()

const apiPort = process.env.API_PORT || 9000
const port = process.env.PORT || 3000

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
app.use(cookieParser())
app.use(morgan('combined', { stream: accessLog }))

redirector.use(cookieParser())

/* Remember to filter fixed routes in the Joi schema */
require('./routes/auth')(app)
require('./routes/clicks')(app)
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

  app.get('/status', (req, res) => {
    res.status(200).json({ message: 'Hello there!' })
  })

  require('./routes/redirects')(redirector)

  console.log(`We're in ${process.env.NODE_ENV} apparently.`)

  if (process.env.NODE_ENV === 'production') {
    const options = {
      cert: fs.readFileSync(process.env.SSL_CERT),
      key: fs.readFileSync(process.env.SSL_KEY)
    }
    https.createServer(options, app).listen(apiPort)
    console.log(`[API] Service (https) started on ${apiPort}.`)
  } else {
    http.createServer(app).listen(apiPort)
    console.log(`[API] Service (http) started on ${apiPort}.`)
  }

  http.createServer(redirector).listen(port)
  console.log(`[WEB] Service started on ${port}.`)
})
