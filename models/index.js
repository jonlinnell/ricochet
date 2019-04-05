/* eslint-disable no-var */
const fs = require('fs')
const path = require('path')
const Sequelize = require('sequelize')

const {
  NODE_ENV,
  DB_DIALECT,
  DB_USER,
  DB_PASS,
  DB_URL,
  DB_NAME
} = process.env

const db = {}
const sequelize = new Sequelize(`${DB_DIALECT}://${DB_USER}${DB_PASS ? `:${DB_PASS}` : ''}@${DB_URL}/${DB_NAME}`, {
  logging: NODE_ENV === 'production' ? false : console.log,
  operatorsAliases: Sequelize.Op
})

fs
  .readdirSync(__dirname)
  .filter(file => (file.indexOf('.') !== 0) && (file !== 'index.js'))
  .forEach((file) => {
    const model = sequelize.import(path.join(__dirname, file))
    db[model.name] = model
  })

Object.keys(db).forEach((modelName) => {
  if ('associate' in db[modelName]) {
    db[modelName].associate(db)
  }
})

db.URL.hasOne(db.Click)

db.sequelize = sequelize
db.Sequelize = Sequelize

module.exports = db
