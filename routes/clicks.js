const Sequelize = require('sequelize')

const verifyToken = require('../lib/verifyToken')

const { Click } = require('../models')

const endpoint = '/clicks'

module.exports = (app) => {
  app.get(endpoint, verifyToken, (req, res) => {
    Click.findAll()
      .then(clicks => res.json(clicks))
      .catch(error => res.status(500).send({ message: error }))
  })

  app.get(`${endpoint}/count`, (req, res) => {
    Click.count({})
      .then(count => res.json({ count }))
      .catch(error => res.status(500).send({ message: error }))
  })

  app.get(`${endpoint}/count/groupByUrl`, (req, res) => {
    Click.findAll({
      attributes: ['URLId', [Sequelize.fn('COUNT', 'URLId'), 'count']],
      group: 'URLId'
    })
      .then(counts => res.json(counts))
      .catch(error => res.status(500).send({ message: error }))
  })

  app.get(`${endpoint}/url/count/:urlid`, (req, res) => {
    Click.count({
      where: {
        URLId: req.params.urlid
      }
    })
      .then(count => res.json({ count }))
      .catch(error => res.status(500).send({ message: error }))
  })

  app.get(`${endpoint}/url/:urlid`, verifyToken, (req, res) => {
    Click.findAll({
      where: {
        URLId: req.params.urlid
      }
    })
      .then(clicks => res.json(clicks))
      .catch(error => res.status(500).send({ message: error }))
  })

  app.get(`${endpoint}/:id`, (req, res) => {
    Click.findOne({
      where: {
        id: req.params.id
      }
    })
      .then(click => res.json(click))
      .catch(error => res.status(500).send({ message: error }))
  })
}
