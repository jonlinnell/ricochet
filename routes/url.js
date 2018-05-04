const Joi = require('joi')
const sha256 = require('sha256')

const Sequelize = require('sequelize')

const verifyToken = require('../lib/verifyToken')

const { URL, Click } = require('../models')

const urlCreateSchema = require('../schemas/urlCreate')
const urlUpdateSchema = require('../schemas/urlUpdate')

const endpoint = '/url'

module.exports = (app) => {
  app.get(endpoint, verifyToken, (req, res) => {
    URL.findAll({
      where: {
        deleted: false
      },
      attributes: {
        include: [[Sequelize.fn('COUNT', Sequelize.col('Click.URLId')), 'clicks']]
      },
      include: [{
        model: Click, attributes: []
      }],
      group: ['Click.URLId', 'URL']
    })
      .then((urls) => {
        res.json(urls)
      })
  })

  app.get(`${endpoint}/deleted`, verifyToken, (req, res) => {
    URL.findAll({
      where: {
        deleted: true
      }
    })
      .then((urls) => {
        res.json(urls)
      })
  })

  app.post(endpoint, verifyToken, (req, res) => {
    Joi.validate(req.body, urlCreateSchema, (error) => {
      if (error !== null) {
        res
          .status(400)
          .send({ message: error.details[0].message })
      } else {
        URL.create(req.body)
          .then((url) => {
            res.json(url)
          })
          .catch(dbError => res
            .status(400)
            .send({ message: dbError.errors[0].message }))
      }
    })
  })

  app.get(`${endpoint}/:id`, verifyToken, (req, res) => {
    URL.findById(req.params.id)
      .then((url) => {
        res.json(url)
      })
  })

  app.put(`${endpoint}/:id`, verifyToken, (req, res) => {
    Joi.validate(req.body, urlUpdateSchema, (error) => {
      if (error !== null) {
        res
          .status(400)
          .send({ message: error.details[0].message })
      } else {
        URL.update(req.body, {
          where: {
            id: req.params.id
          }
        })
          .then(() => {
            URL.findById(req.params.id)
              .then((url) => {
                res.json(url)
              })
          })
      }
    })
  })

  app.delete(`${endpoint}/:id`, verifyToken, (req, res) => {
    URL.findById(req.params.id)
      .then((url) => {
        URL.update({
          title: `${url.title}_${sha256(`${url.title}${url.createdAt}`).substr(51, 6)}`,
          deleted: true
        }, {
          where: {
            id: req.params.id
          }
        })

        return res.sendStatus(200)
      })
      .catch(error => res.status(400).send({ message: error }))
  })
}
