var express = require('express');
var jwt = require('jsonwebtoken');
var fs = require('fs');

var User = require('../models/User');
var Image = require('../models/Image');
var Configs = require('../configs');
var router = express.Router();


var imgPath = 'C:/Users/harish/Desktop/Node_8.0/male.png';

/* GET users listing. */
router.post('/login', function (req, res, next) {
  console.log(req.body.email + '' + req.body.password);
  User.findOne({
    $text: {
      $search: req.body.email
    }
  }).populate('image').exec((err, doc) => {
    if (err) {
      next(err);
    }
    if (!doc) {
      res.status(404).json({
        message: 'User not found'
      });
    }
    else if (req.body.password != doc.password) {
      res.status(401).json({
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
        id: doc._id,
        name: doc.name,
        email: doc.email,
        isAdmin: doc.isAdmin,
        gender: doc.gender,
        avatar: doc.avatar,
        token: token
      });
    }
  });
});

router.post('/signup', (req, res, next) => {
  console.log(req.body.email + '' + req.body.password);
  var url = "/images/";
  var avatar = "male.png";
  if (req.body.gender.localeCompare('Female') == 0) {
    avatar = "female.png";
  }
  var user = new User({
    name: req.body.name.toUppercase,
    password: req.body.password,
    email: req.body.email,
    gender: req.body.gender,
    avatar: url + avatar
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
      id: doc._id,
      name: doc.name,
      email: doc.email,
      isAdmin: doc.isAdmin,
      gender: doc.gender,
      avatar: doc.avatar,
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
          let users = [];
          for (let doc of docs) {
            users.push({
              id: doc._id,
              name: doc.name,
              email: doc.email,
              isAdmin: doc.isAdmin,
              gender: doc.gender,
              avatar: doc.avatar
            })
          }
          res.status(200).json(users);
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

});

router.get('/getUsersCount', (req, res, next) => {
  User.find().countDocuments((err, count) => {
    if (err) throw err;
    res.status(200).json(count);
  });
});

router.get('/allUser/:limit/:skip', (req, res, next) => {
  var limit = parseInt(req.params.limit);
  var skip = parseInt(req.params.skip);
  User.find()
    .sort({ "_id": 1 })
    .skip(skip)
    .limit(limit)
    .exec((err, docs) => {
      if (err) throw err;
      let users = [];
      for (let doc of docs) {
        users.push({
          id: doc._id,
          name: doc.name,
          email: doc.email,
          isAdmin: doc.isAdmin,
          gender: doc.gender,
          avatar: doc.avatar
        })
      }
      res.status(200).json(users);
    });
});

module.exports = router;
