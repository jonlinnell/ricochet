const { URL, Click } = require('../models')

module.exports = (redirector) => {
  redirector.get('/:title', (req, res) => {
    URL.findOne({
      where: {
        title: req.params.title
      }
    })
      .then(thisUrl =>
        Click.create({
          URLId: thisUrl.id
        })
          .then(() => res.redirect(thisUrl.url))
          .catch(error => res.status(500).send(error)))
      .catch(() => res.sendStatus(404))
  })
}
