const Joi = require('joi')

module.exports = Joi.object().keys({
  title: Joi.string()
    .regex(/^[A-Za-z0-9_-]{2,256}$/)
    .required(),
  url: Joi.string()
    .regex(/^http(s)?:\/\/[-a-zA-Z0-9@:%._+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_+.~#?&//=]*)$/)
    .regex(/^url$/i, { invert: true })
    .regex(/^auth$/i, { invert: true })
    .required()
})
