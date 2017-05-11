var http = require('http');
var express = require('express');
var morgan = require('morgan');
var fs = require('fs');
var path = require('path');
var rfs = require('rotating-file-stream');
var colours = require('colors');
var _ = require('lodash');

var app = express();

const logDirectory = path.join(__dirname, 'log')
const port = process.env.PORT || 9000;
const config = require('./config');

morgan.token('real-ip', function (req, res) { return req.headers['x-real-ip'] });

fs.existsSync(logDirectory) || fs.mkdirSync(logDirectory);

var accessLogStream = rfs('access.log', {
  interval: '1d',
  path: logDirectory
});

app.use(morgan('[:date[web]] ' + _.padEnd('(:real-ip)', 15) + ':url'.green));
app.use(morgan(':real-ip - :remote-user [:date[clf]] ":method :url HTTP/:http-version" :status :res[content-length] ":referrer" ":user-agent"', {stream: accessLogStream}));

// Load routes
for (let [key, value] of Object.entries(config.redirects)) {  
  app.get('/'+key, function(req, res) {
    res.redirect(value);
    console.log(JSON.stringify(req.headers,null,2));
  });
}

// Send everything else to the homepage
app.get('*', function(req, res) {
  res.redirect(config.defaultRedirect);
});

http.createServer(app).listen(port, function() {
  console.log('Server listening on port ' + port);
});