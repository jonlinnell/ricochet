module.exports = (sequelize, DataTypes) => {
  const Click = sequelize.define('Click', {
    userId: {
      type: DataTypes.STRING,
      allowNull: false
    }
  })

  // one-to-one association with URL has to be made in ./index.js

  return Click
}
