const { URL, Click } = require('../models')
const cookieAgent = require('../lib/cookieAgent')

module.exports = (redirector) => {
  redirector.get('/:title', cookieAgent, (req, res) => {
    URL.findOne({
      where: {
        title: req.params.title
      }
    })
      .then(thisUrl =>
        Click.create({
          userId: req.rtuid,
          URLId: thisUrl.id
        })
          .then(() => res.redirect(thisUrl.url))
          .catch(() => res.sendStatus(500)))
      .catch(() => res.sendStatus(404))
  })
}
