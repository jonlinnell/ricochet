const http = require('http');
const express = require('express');
const morgan = require('morgan');
const path = require('path');
const useragent = require('useragent');
const geoip = require('geoip-lite');
const Sequelize = require('sequelize');
require('colors');
useragent(true);

var app = express();

const config = require('./config');
const urls = require('./urls');

const port = process.env.PORT || 9000;

const db = new Sequelize(config.db.dbase, config.db.user, config.db.pass);
const Hit = db.import(path.resolve(__dirname, 'models/hit.model'));

morgan.token('real-ip', (req, res) => { return req.headers['x-real-ip']; }); // eslint-disable-line no-unused-vars
app.use(morgan('[:date[web]] ' + ':real-ip'.blue + '\t:url'.green));

// Load redirects from config
for (let [key, value] of Object.entries(urls.urls)) {
  app.get('/' + key, (req, res) => {
    res.redirect(value);
    const agent = useragent.parse(req.headers['user-agent']);
    const ip = req.headers['x-real-ip'] || req.ip;
    const ipData = geoip.lookup(ip);

    db.sync({ loggine: console.log })
      .then(() => Hit.create({
        // id:
        url: req.url,
        date: Date.now(),
        ip,
        browserFamily: agent.family,
        browserVersionMajor: agent.major,
        browserVersionMinor: agent.minor,
        browserVersionPatch: agent.patch,
        deviceFamily: agent.device.family,
        deviceVersionMajor: agent.device.major,
        deviceVersionMinor: agent.device.minor,
        deviceVersionPatch: agent.device.patch,
        osFamily: agent.os.family,
        osVersionMajor: agent.os.major,
        osVersionMinor: agent.os.minor,
        osVersionPatch: agent.os.patch,
        country: ipData.country,
        region: ipData.region,
        city: ipData.city,
        lat: ipData.ll[0],
        lon: ipData.ll[1]
      }))
      .then(thisHit => {
        console.log(thisHit.get({
          plain: true
        }));
      })
      .catch(error => {
        console.log(error);
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
