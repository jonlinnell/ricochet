const jwt = require('jsonwebtoken')
const Joi = require('joi')
const bcrypt = require('bcryptjs')

const verifyToken = require('../lib/verifyToken')

const { User } = require('../models')

const userCreateSchema = require('../schemas/userCreate')

module.exports = (app) => {
  app.post('/auth/register', verifyToken, (req, res) => {
    Joi.validate(req.body, userCreateSchema, (error) => {
      if (error !== null) {
        res
          .status(400)
          .send({ message: error.details[0].message })
      } else {
        const hashedPassword = bcrypt.hashSync(req.body.password, 8)

        User.create({
          username: req.body.username,
          password: hashedPassword
        })
          .then((newUser) => {
            const token = jwt.sign(
              { id: newUser.id },
              process.env.SECRET,
              { expiresIn: 86400 }
            )
            res.status(200).send({ auth: true, token })
          })
      }
    })
  })

  app.get('/auth/me', verifyToken, (req, res) => {
    User.findById(req.userId, {
      attributes: { exclude: ['password', 'createdAt', 'updatedAt'] }
    })
      .then((user) => {
        if (!user) {
          return res.status(404).send('User not found.')
        }
        return res.status(200).send(user)
      })
      .catch(dbErr => res.status(500).send(`A server error occurred. ${dbErr}`))
  })

  app.post('/auth/login', (req, res) => {
    User.findOne({
      where: {
        username: req.body.username
      }
    })
      .then((user) => {
        if (!user) {
          return res.status(404).send({ auth: false, message: 'User not found.' })
        }

        const passwordIsValid = bcrypt.compareSync(req.body.password, user.password)

        if (!passwordIsValid) {
          return res.status(401).send({ auth: false, message: 'Password incorrect', token: null })
        }

        const token = jwt.sign({ id: user.id }, process.env.SECRET, { expiresIn: 86400 })
        return res.status(200).send({ auth: true, token })
      })
      .catch(err => res.status(500).send({ auth: false, message: `A server error occurred. ${err}` }))
  })
}
