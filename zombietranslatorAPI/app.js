var express = require('express');
var bodyParser = require('body-parser');
var amdLoader = require('amd-loader');
var morgan = require('morgan')
// Translate service module
var translateService = require('./translateService.js');
// App setup
var app = express();
var serverPort = 3000;
app.use(bodyParser.json());
// request logging.
app.use(morgan('combined'));
// setup CORS
app.use(function(req, res, next){
  res.header("Access-Control-Allow-Origin", "*");
  res.header('Access-Control-Allow-Methods', 'POST, GET, PUT, DELETE, OPTIONS');
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

// catch 404 and forward to error handler
// app.use(function(req, res, next) {
//   var err = new Error('Not Found');
//   err.status = 404;
//   next(err);
// });

app.use(function(err, req, res, next) {
  if (err.status === 404 || res.status === 404) {
    res.json({message : 'route not found'});
  }
});

// routes
app.get('/', function(req, res){
  res.send('Welcome to zombify API.: <br>GET \'/zombify\' - takes a query parameter' +
  ' for input, returns a json object with a single key:value containing the result' +
  '<br>GET \'/unzombify\' - takes a query parameter for input, returns a json ' +
  ' object with a single key:value containing the result');
});

app.get('/zombify/:text', function(req, res){
  translate(req.params.text, res, 'zombify');
});

app.get('/unzombify/:text', function(req, res){
  translate(req.params.text, res, 'unzombify');
});

// translate logic
translate = function(text, res, operation) {
  if (text && text.length > 1000) {
    res.status(414)
      .send('Text translation over 1000 is not supported at this time')
      .end();
  } else {
    if (operation && operation === 'zombify') {
      res.json({result : translateService.zombify(text)});
    } else if (operation && operation === 'unzombify')
      res.json({result : translateService.unzombify(text)});
  }
};

var listener = app.listen(serverPort, function(){
  console.log('Listening on port ' + listener.address().port);
});
