var http = require('http');
var path = require('path');
var express = require('express');
var compress = require('compression');
var app = express();
var port = process.env.PORT || 9000;

var config = require('./config');

app.use(compress());
app.use(express.static(__dirname + '/dist'));
app.set('views', path.join(__dirname, '/dist'));
app.set('view engine', 'jade');

// Load routes
for (let [key, value] of Object.entries(config.redirects)) {  
  app.get('/'+key, function(req, res) {
    console.log(req);
    res.redirect(value)
  });
}

// Send everything else to the homepage
app.get('*', function(req, res) {
  res.redirect(config.defaultRedirect);
});

http.createServer(app).listen(port, function() {
  console.log('Server listening on port ' + port);
});