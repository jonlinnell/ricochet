const bcrypt = require('bcryptjs')
const Joi = require('joi')
const jwt = require('jsonwebtoken')
const sha256 = require('sha256')
const { Router } = require('express')

const verifyToken = require('../lib/verifyToken')

const { User } = require('../models')

const userCreateSchema = require('../schemas/userCreate')
const userDeleteSchema = require('../schemas/userDelete')
const userUpdatePasswordSchema = require('../schemas/userUpdatePassword')
const loginCredentialsSchema = require('../schemas/loginCredentials')

const router = Router()

router.post('/register', verifyToken, (req, res) => {
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
        .then(newUser => res.status(200).send({
          username: newUser.username,
          createdAt: newUser.createdAt
        }))
    }
  })
})

router.get('/me', verifyToken, (req, res) => {
  User.findById(req.userId, {
    attributes: { exclude: ['password', 'createdAt', 'updatedAt'] }
  })
    .then((user) => {
      if (!user) {
        return res.status(404).send('User not found.')
      }
      return res.status(200).send(user)
    })
    .catch(dbError => res.status(500).send({ message: `A server error occurred. ${dbError}` }))
})

router.get('/user', verifyToken, (req, res) => {
  User.findAll({
    where: {
      deleted: false
    },
    attributes: ['id', 'username', 'createdAt', 'deleted']
  })
    .then(users => res.json(users))
    .catch(dbError => res.status(500).send({ message: `A server error occurred. ${dbError}` }))
})

router.put('/user/:id/password', verifyToken, (req, res) => {
  Joi.validate(req.body, userUpdatePasswordSchema, (error) => {
    if (error !== null) {
      res
        .status(400)
        .send({ message: error.details[0].message })
    } else {
      User.findOne({
        where: {
          id: req.params.id,
          deleted: false
        }
      })
        .then(user => User.update(
          {
            password: bcrypt.hashSync(req.body.password, 8)
          },
          {
            where: { id: user.id }
          }
        )
          .then(() => res.sendStatus(200))
          .catch(message => res.status(500).send({ message })))
        .catch(message => res.status(500).send({ message }))
    }
  })
})

router.delete('/user/:username', verifyToken, (req, res) => {
  Joi.validate(req.params, userDeleteSchema, (error) => {
    if (error) {
      res.status(400).send({ message: error })
    } else {
      User.findOne({
        where: {
          username: req.params.username
        }
      })
        .then((user) => {
          if (!user) {
            return res.status(404).send({ message: 'User not found.' })
          }
          User.update({
            username: `${user.username}_${sha256(`${user.username}${user.createdAt}`).substr(51, 6)}`,
            deleted: true
          }, {
            where: {
              username: user.username
            }
          })
            .then(() => res.sendStatus(200))
            .catch(message => res.status(500).send({ message }))
        })
        .catch(message => res.status(500).send({ message }))
    }
  })
})

router.post('/login', (req, res) => {
  Joi.validate(req.body, loginCredentialsSchema, (error) => {
    if (error !== null) {
      res
        .status(400)
        .send({ message: error.details[0].message })
    } else {
      User.findOne({
        where: {
          username: req.body.username,
          deleted: false
        }
      })
        .then((user) => {
          if (!user) {
            return res.status(400).send({ auth: false, message: 'User not found.' })
          }

          const passwordIsValid = bcrypt.compareSync(req.body.password, user.password)

          if (!passwordIsValid) {
            return res.status(401).send({ auth: false, message: 'Password incorrect' })
          }

          const token = jwt.sign({ id: user.id }, process.env.SECRET, { expiresIn: 86400 })
          return res.status(200).send({ auth: true, token })
        })
        .catch(dbError => res.status(500).send({ auth: false, message: `A server error occurred. ${dbError}` }))
    }
  })
})

module.exports = router
