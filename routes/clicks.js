const verifyToken = require('../lib/verifyToken')

const { Click } = require('../models')

const endpoint = '/clicks'

module.exports = (app) => {
  app.get(endpoint, verifyToken, (req, res) => {
    Click.findAll()
      .then((clicks) => {
        res.json(clicks)
      })
  })

  app.get(`${endpoint}/count`, verifyToken, (req, res) => {
    Click.count()
      .then((count) => {
        res.json({ count })
      })
  })
}
