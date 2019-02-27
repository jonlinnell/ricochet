const { URL, Click } = require('../models')

const { DEFAULT_URL } = process.env

module.exports = (redirector) => {
  redirector.get('/', (req, res) => {
    if (!DEFAULT_URL) {
      res.sendStatus(404)
    } else {
      res.redirect(DEFAULT_URL)
    }
  })

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
      .catch(() => {
        res.sendStatus(404)
        // @TODO: Show 'not found' page!
      })
  })
}
