var http = require('http');
var express = require('express');
var morgan = require('morgan');
var fs = require('fs');
var path = require('path');
var rfs = require('rotating-file-stream');
var colours = require('colors'); // eslint-disable-line no-unused-vars

var app = express();

const config = require('./config');

const logDirectory = path.join(__dirname, 'log');
const port = process.env.PORT || 9000;

fs.existsSync(logDirectory) || fs.mkdirSync(logDirectory);

morgan.token('real-ip', (req, res) => { return req.headers['x-real-ip']; }); // eslint-disable-line no-unused-vars

var accessLogStream = rfs('access.log', {
  interval: config.logInterval,
  compress: 'gzip',
  path: logDirectory
});

app.use(morgan('[:date[web]] ' + ':real-ip'.blue + '\t:url'.green));
app.use(morgan(':real-ip - :remote-user [:date[clf]] ":method :url HTTP/:http-version" :status :res[content-length] ":referrer" ":user-agent"', {stream: accessLogStream}));

// Load redirects from config
for (let [key, value] of Object.entries(config.redirects)) {
  app.get('/' + key, (req, res) => {
    res.redirect(value);
  });fskdjfhskdjhf
}

// Default redirect for everything else
app.get('*', (req, res) => {
  res.redirect(config.defaultRedirect);
});

http.createServer(app).listen(port, () => {
  console.log('Server listening on port ' + port); // eslint-disable-line no-console
});
