var express = require('express');
var jwt = require('jsonwebtoken');

var User = require('../models/User');
var Configs = require('../configs');
var router = express.Router();

/* GET users listing. */
router.post('/login', function (req, res, next) {
  User.findOne({
    email: req.body.email
  }, (err, doc) => {
    if (err) {
      next(err);
    }
    if (!doc) {
      res.status(404).json({
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
        name: doc.name,
        isAdmin: doc.isAdmin
      }
      var token = jwt.sign(payload, Configs.secret, {
        expiresIn: '1d'
      });
      res.status(200).json({
        _id: doc._id,
        name: doc.name,
        email:doc.email,
        isAdmin: doc.isAdmin,
        token: token
      });
    }    
  });
});

router.post('/signup', (req, res, next) => {
  var user = new User({
    name: req.body.name,
    password: req.body.password,
    email: req.body.email,
    gender: req.body.gender
  });
  user.save((err, doc) => {
    if (err) {
      next(err);
    }
    var payload = {
      email: user.email,
      isAdmin: false
    }
    var token = jwt.sign(payload, Configs.secret, {
      expiresIn: '1d'
    });
    res.status(201).json({
      _id: doc._id,
      name: doc.name,
      email:doc.email,
      isAdmin: doc.isAdmin,
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
          res.status(200).json({ users: docs, token: token });
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
