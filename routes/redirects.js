const { URL } = require('../models')

module.exports = (app) => {
  URL.findAll({
    attributes: ['title', 'url']
  })
    .then((urls) => {
      urls.forEach((thisUrl) => {
        app.get(`/${thisUrl.title}`, (req, res) => {
          res.redirect(thisUrl.url)
        })
      })
    })
}
