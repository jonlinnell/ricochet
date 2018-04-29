const Joi = require('joi')

module.exports = Joi.object().keys({
  password: Joi.string().min(8).required()
})
