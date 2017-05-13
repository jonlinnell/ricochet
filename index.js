var http = require('http');
var express = require('express');
var morgan = require('morgan');
var fs = require('fs');
var path = require('path');
var rfs = require('rotating-file-stream');
require('colors');

var app = express();

const config = require('./config');
const urls = require('./urls');

const port = process.env.PORT || 9000;
const logDirectory = path.join(__dirname, 'log');

fs.existsSync(logDirectory) || fs.mkdirSync(logDirectory);

var accessLogStream = rfs('access.log', {
  interval: config.logInterval,
  compress: 'gzip',
  path: logDirectory
});

morgan.token('real-ip', (req, res) => { return req.headers['x-real-ip']; }); // eslint-disable-line no-unused-vars
app.use(morgan('[:date[web]] ' + ':real-ip'.blue + '\t:url'.green));
app.use(morgan(':real-ip - :remote-user [:date[clf]] ":method :url HTTP/:http-version" :status :res[content-length] ":referrer" ":user-agent"', {stream: accessLogStream}));

// Load redirects from config
for (let [key, value] of Object.entries(urls.urls)) {
  app.get('/' + key, (req, res) => {
    res.redirect(value);
  });
}

// Default redirect for everything else
app.get('*', (req, res) => {
  res.redirect(urls.default);
});

http.createServer(app).listen(port, () => {
  console.log('Server listening on port ' + port); // eslint-disable-line no-console
});
