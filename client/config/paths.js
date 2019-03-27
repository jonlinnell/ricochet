const path = require('path')

const app = path.resolve(`${__dirname}/../`)

module.exports = {
  app,
  src: app + '/src',
  build: app + '/dist'
}