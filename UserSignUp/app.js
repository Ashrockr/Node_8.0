var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require('cors');

var usersRouter = require('./routes/users');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors());


app.use('/api', usersRouter);

app.use('/', function(req, res, next) {
  res.render('index');
});

// error handler
app.use(function(err, req, res, next) {
  res.status(500).render('index',{
    message : 'Some Error occured on server',
    error : err
  });
});

module.exports = app;
