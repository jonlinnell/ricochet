module.exports = (sequelize, DataTypes) => {
  return sequelize.define('hit', {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    url: {
      type: DataTypes.STRING,
      allowNull: false
    },
    date: {
      type: DataTypes.DATE,
      defaultValue: sequelize.NOW,
      allowNull: false
    },
    ip: DataTypes.STRING,
    browserFamily: DataTypes.STRING,
    browserVersionMajor: DataTypes.INTEGER,
    browserVersionMinor: DataTypes.INTEGER,
    browserVersionPatch: DataTypes.INTEGER,
    deviceFamily: DataTypes.STRING,
    deviceVersionMajor: DataTypes.INTEGER,
    deviceVersionMinor: DataTypes.INTEGER,
    deviceVersionPatch: DataTypes.INTEGER,
    osFamily: DataTypes.STRING,
    osVersionMajor: DataTypes.INTEGER,
    osVersionMinor: DataTypes.INTEGER,
    osVersionPatch: DataTypes.INTEGER,
    country: DataTypes.STRING,
    region: DataTypes.STRING,
    city: DataTypes.STRING,
    lat: DataTypes.FLOAT,
    lon: DataTypes.FLOAT
  });
};
