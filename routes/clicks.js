const Sequelize = require('sequelize')

const verifyToken = require('../lib/verifyToken')

const { Click } = require('../models')

const { Op } = Sequelize

const endpoint = '/clicks'

module.exports = (app) => {
  app.get(endpoint, verifyToken, (req, res) => {
    Click.findAll()
      .then(clicks => res.json(clicks))
      .catch(error => res.status(500).send(error))
  })

  app.get(`${endpoint}/:id`, verifyToken, (req, res) => {
    Click.findAll({
      where: {
        URLId: req.params.id
      }
    })
      .then(clicks => res.json(clicks))
      .catch(error => res.status(500).send(error))
  })

  app.get(`${endpoint}/calendarCount/:id/:days`, verifyToken, (req, res) => {
    Click.findAll({
      where: {
        createdAt: { // eslint-disable-next-line no-mixed-operators
          [Op.gte]: new Date(new Date() - req.params.days * 24 * 60 * 60 * 1000)
        }
      }
    })
      .then(clicks => res.json({ clicks }))
      .catch(error => res.status(500).send(error))
  })
}
