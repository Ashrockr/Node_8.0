var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var jwt = require('jsonwebtoken');
var User = require('../models/User');
var configs = require('../configs');

router.post('/login', function (req, res, next) {
    var user = new User({
        name: req.body.name,
        password: req.body.password
    });
    User.findOne({
        name: user.name
    }, (err, userFound) => {
        if (err) {
            return res.status(503);
        }
        if (!user) {
            res.status(404);
        }
        else if (user.password != userFound.password) {
            res.status(422);
        }
        else {
            var payload = user.name;
            var token = jwt.sign(payload, configs.secret, {
                expiresIn: "1d"
            });
            res.setHeader('x-access-token', token);
            res.status(200).json({
                name: userFound.name
            })
        }

    });
});

router.post('/signup', function (req, res, next) {
    var user = new User({
        name: req.body.name,
        password: req.body.password
    });
    user.save((err, userSaved) => {
        if (err) {
            return res.status(503);
        }
        var payload = {
            name : user.name
        };
        var token = jwt.sign(payload, configs.secret, {
            expiresIn: '7d'
        });
        res.setHeader('x-access-token', token);
        res.status(201).json({
            name: userSaved.name
        });
    });
});
router.use((req, res, next) => {
    var token = req.headers['x-access-token'];
    if (token) {
        jwt.verify(token, configs.secret, (err, decoded) => {
            if (err) {
                return res.json({
                    success: false,
                    message: 'Failed to Authenticate Token'
                });
            }
            else {
                req.decoded = decoded;
                next();
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

module.exports = router;
