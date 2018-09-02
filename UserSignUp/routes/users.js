var express = require('express');
var jwt = require('jsonwebtoken');

var User = require('../models/User');
var Configs = require('../configs');
var router = express.Router();

/* GET users listing. */
router.post('/login', function (req, res, next) {
  User.findOne({
    name: req.body.name
  }, (err, doc) => {
    if (err) {
      next(err);
    }
    if (!doc) {
      res.json({
        message: 'User not found'
      });
    }
    else if (req.body.password != doc.password) {
      res.json({
        message: 'Incorrect Password'
      });
    }
    else {
      var payload = {
        name: doc.name
      }
      var token = jwt.sign(payload, Configs.secret, {
        expiresIn: '1d'
      });
      res.render('user', {
        _id: doc._id,
        name: doc.name,
        loggedMethod: 'Logged In',
        token: token
      });
    }
  });
});

router.post('/signup', (req, res, next) => {
  var user = new User({
    name: req.body.name,
    password: req.body.password
  });
  user.save((err, doc) => {
    if (err) {
      next(err);
    }
    var payload = {
      name: user.name
    }
    var token = jwt.sign(payload, Configs.secret, {
      expiresIn: '1d'
    });
    res.render('user', {
      _id: doc._id,
      name: doc.name,
      loggedMethod: 'Signed Up',
      token: token
    });
  })
});

router.get('/allUser', (req, res, next) => {
  var token = req.query.token;
  if (token) {
    jwt.verify(token, Configs.secret, (err, decoded) => {
      if (err) {
        throw err;
      }
      else {
        User.find((err, docs) => {
          if (err) throw err;
          res.render('allUser', { users: docs, token: token });
        });
      }
    })
  }
  else {
    return res.json({
      success: false,
      message: 'No Token was provided'
    });
  }
 
})

module.exports = router;
