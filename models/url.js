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
    },
    deleted: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
      allowNull: false
    },
    createdBy: {
      type: DataTypes.SMALLINT,
      defaultValue: 1,
      allowNull: false
    },
    lastModifiedBy: DataTypes.SMALLINT
  })

  return URL
}
