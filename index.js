const express = require('express');
const http = require('http');
const morgan = require('morgan');
const Sequelize = require('sequelize');
const userDataHelper = require('./helpers/user-data');
require('colors');

const hitCtrl = require('./controllers/hit.controller');

var app = express();

const config = require('./config');
const urls = require('./urls');

const port = process.env.PORT || 9000;
// const env = process.env.NODE_ENV || 'dev';

const db = new Sequelize(config.db.database, config.db.user, config.db.pass, {
  host: config.db.host,
  dialect: config.db.dialect,
  port: config.db.port,
  logging: process.env.NODE_ENV === 'dev' ? console.log : false
});

db
  .authenticate()
  .then(() => {
    console.log('Database connection has been established successfully.'.green); // eslint-disable-line no-console
  })
  .catch(err => {
    console.error(`Unable to connect to the database: ${err}`.red); // eslint-disable-line no-console
  });

morgan.token('real-ip', (req, res) => { return req.headers['x-real-ip']; }); // eslint-disable-line no-unused-vars
app.use(morgan('[:date[web]] ' + ':real-ip'.blue + '\t:url'.green));

// Load redirects from config
for (let [key, value] of Object.entries(urls.urls)) {
  app.get(`/${key}`, (req, res) => {
    userDataHelper.get(req)
      .then(hitUserData => {
        hitCtrl.saveHit(db, req.url, hitUserData);
      })
      .then(() => {
        res.redirect(value);
      })
      .catch(error => {
        res.send(error.red);
      });
  });
}

// Default redirect for everything else
app.get('*', (req, res) => {
  res.redirect(urls.default);
});

http.createServer(app).listen(port, () => {
  console.log('Server listening on port ' + port); // eslint-disable-line no-console
});
