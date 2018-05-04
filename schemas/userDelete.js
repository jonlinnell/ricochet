const Joi = require('joi')

module.exports = Joi.object().keys({
  username: Joi.string().invalid('admin').required()
})
