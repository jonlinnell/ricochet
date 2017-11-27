module.exports = (sequelize, DataTypes) => {
  const URL = sequelize.define('URL', {
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    url: {
      type: DataTypes.STRING,
      allowNull: false
    }
  })

  return URL
}
