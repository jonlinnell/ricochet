const fs = require('fs')

module.exports = (app) => {
  fs.readdirSync(__dirname).forEach((file) => {
    if (file === 'index.js') return
    require(`./${file.substr(0, file.indexOf('.'))}`)(app)
  })
}
