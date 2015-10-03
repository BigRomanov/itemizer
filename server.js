'use strict';

// Itemizer Server v 1.0

var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');
var http = require('http');
var passport = require('passport');
var path = require('path');
var fs = require('fs');
var mongoStore = require('connect-mongo')(session);

var LocalStrategy = require('passport-local').Strategy;


var config = require('./server/config/config');

//var routes = require('./server/config/routes');

// var routes = require('./routes/index');
// var users = require('./routes/users');

var app = express();

// Connect to database
var db = require('./server/db/mongo').db;

// Bootstrap models
var modelsPath = path.join(__dirname, 'server/models');
fs.readdirSync(modelsPath).forEach(function (file) {
  require(modelsPath + '/' + file);
});

var pass = require('./server/config/pass');

// view engine setup
app.set('views', path.join(__dirname, './client/views'));
app.engine('html', require('ejs').renderFile);
//app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
app.use(favicon(path.join(__dirname, 'client', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'client')));

app.use(session({
  secret: 'MEAN',
  store: new mongoStore({
    url: config.db,
    collection: 'sessions'
  }),
  resave: true,
  saveUninitialized: true
}));

// use passport session
app.use(passport.initialize());
app.use(passport.session());

// app.use('/', routes);
// app.use('/users', users);


//Bootstrap routes
require('./server/config/routes')(app);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error.html', {
    message: err.message,
    error: {}
  });
});


module.exports = app;
