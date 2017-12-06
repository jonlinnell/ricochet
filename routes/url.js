const Joi = require('joi')

const verifyToken = require('../lib/verifyToken')

const { URL } = require('../models')

const urlCreateSchema = require('../schemas/urlCreate')
const urlUpdateSchema = require('../schemas/urlUpdate')

const endpoint = '/url'

module.exports = (app) => {
  app.get(endpoint, verifyToken, (req, res) => {
    URL.findAll()
      .then((urls) => {
        res.json(urls)
      })
  })

  app.post(endpoint, verifyToken, (req, res) => {
    Joi.validate(req.body, urlCreateSchema, (error) => {
      if (error !== null) {
        res.sendStatus(400)
      } else {
        URL.create(req.body)
          .then((url) => {
            require('../routes/redirects')(app)
            res.json(url)
          })
          .catch(err => res
            .status(400)
            .send({ message: err.errors[0].message }))
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
        res.sendStatus(400)
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
        url.destroy()

        return res.sendStatus(200)
      })
      .catch(err => res.status(400).send(err))
  })
}
