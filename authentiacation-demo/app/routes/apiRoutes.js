const express = require('express');
const User = require('../models/user');
const apiRoutes = express.Router();
const jwt = require('jsonwebtoken');

const configs = require('../../configs');

// route to authenticate a user (POST http://localhost:3000/api/authenticate)
apiRoutes.post('/authenticate', (req, res) => {
    User.findOne({
        name: req.body.name
    }, (err, user) => {
        if (err) throw err;
        console.log(!user);
        if (!user) {
            res.json({
                success: false,
                message: 'Authentication Failed! User not found'
            });
        }
        else if (user) {
            console.log(user.password);
            console.log(req.body.password);
            console.log('Password@123' !== 'Password@123');
            if (user.password !== req.body.password) {
                res.json({ success: false, message: 'Authentication failed. Wrong password.' });
            }
            else {
                const payload = {
                    admin: user.admin
                };
                var token = jwt.sign(payload, configs.secret, {
                    expiresIn: 1440
                });
                res.json({
                    success: true,
                    message: "Token generated",
                    token: token
                })

            }
        }
    })
});

apiRoutes.use((req, res, next) => {
    var token = req.body.token || req.query.token || req.headers['x-access-token'];
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

// route to get list of all users (POST http://localhost:3000/api/users)
apiRoutes.get('/users', (req, res) => {
    User.find({}, (err, users) => {
        res.json(users);
    })
})
// route to greet  user (POST http://localhost:3000/api/)
apiRoutes.get('/', (req, res) => {
    res.json({ 'message': 'API route' });
})



module.exports = apiRoutes;