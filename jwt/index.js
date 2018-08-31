var express = require('express');
var bodyParser = require('body-parser');
var jwt = require('jsonwebtoken');
var app = express();

process.env.secretKey = 'Capgemini';

var generatedToken = jwt.sign('karthik', process.env.secretKey);
console.log(generatedToken);


app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use('/admin', (req, res, next) => {
    var token = req.body.access_token || req.headers['x-access-token'];
    if(token){
        jwt.verify(token,process.env.secretKey,function(err,decode){
            if(err)
                res.status(401).send('Not Authorized');
            else
                next();
        });
    }else{
        res.status(400).send('Pass a token');
    }
});

app.get('/admin', (req, res) => {
    res.send('<h1>Admin page - GET</h1>');
});

app.post('/admin', (req, res) => {
    res.send('<h1>Admin page - POST</h1>');
});

app.get('/', (req, res) => {
    res.send('<h1>Home page</h1>');
});

app.listen(3000, () => {
    console.log('Server listening on port 3000 at localhost');
});
