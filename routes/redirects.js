const { URL, Click } = require('../models')
const cookieAgent = require('../lib/cookieAgent')

module.exports = (app) => {
  URL.findAll({
    attributes: ['id', 'title', 'url']
  })
    .then((urls) => {
      urls.forEach((thisUrl) => {
        app.get(`/${thisUrl.title}`, cookieAgent, (req, res) => {
          Click.create({
            userId: req.rtuid,
            URLId: thisUrl.id
          })

          res.redirect(thisUrl.url)
        })
      })
    })
}
