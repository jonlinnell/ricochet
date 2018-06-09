module.exports = (sequelize) => {
  const Click = sequelize.define('Click', {})

  // one-to-one association with URL has to be made in ./index.js

  return Click
}
