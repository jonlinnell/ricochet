const Joi = require('joi')

module.exports = Joi.object().keys({
  title: Joi.string()
    .regex(/^(?!\/)[A-Za-z0-9\/_-]{2,256}$/) // eslint-disable-line no-useless-escape
    .regex(/^favicon\.ico$/i, { invert: true })
    .regex(/^url$/i, { invert: true })
    .regex(/^auth$/i, { invert: true })
    .regex(/^clicks$/i, { invert: true }),
  url: Joi.string()
    .regex(/^https:\/\/[-a-zA-Z0-9@:%._+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_+.~#?&//=]*)$/)
})
