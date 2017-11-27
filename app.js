/* eslint-disable no-console */
require('dotenv').config()
const bodyParser = require('body-parser')
const express = require('express')
const morgan = require('morgan')
const bcrypt = require('bcryptjs')

const models = require('./models')
const { User } = require('./models')

const app = express()

const port = process.env.PORT || 3000

app.use(bodyParser.urlencoded({ extended: false }))
app.use(morgan('combined'))

app.get('/status', (req, res) => {
  res.status(200).send('Hello there!')
})

require('./routes/auth')(app)
require('./routes/url')(app)

models.sequelize.sync().then(() => {
  console.log('Database connection established.')

  if (process.env.NODE_ENV === 'development') {
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
