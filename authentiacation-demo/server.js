const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const morgan = require('morgan');
const mongoose = require('mongoose');
const jwt =  require('jsonwebtoken');

const configs = require('./configs');
const User = require('./app/models/user');
const apirRoutes = require('./app/routes/apiRoutes');

//Configurations 
const port = process.env.port || configs.port;
mongoose.connect(configs.database,{useNewUrlParser: true }).then((db)=>{
    console.log(`-----Connected to databse ${mongoose.connection.db.databaseName} ------`);
}).catch((err)=>{
    console.log(`Error : ${err}`);
});
app.set('superSecret',configs.secret);

//use bodyParser to get the info from POST and morgan to log request
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());
app.use(morgan('dev'));
//Setup API Routes
app.use('/api',apirRoutes);

//NORMAL ROUTES
app.get('/setup',(req,res)=>{
    var ash = new User({
        name:'Ashish',
        password:'Password@123'
    });
    ash.save((err,user)=>{
        if(err) {
            throw err;
        }
        res.json(user);
    })
});
app.get('/',(req,res)=>{
    res.send(`Welcome to the HomePage. Check the API page from <a href=http://localhost:${port}/api>here</a>`);
});

app.listen(port,()=>{
    console.log(`Server started listening at http://localhost:${port}`);
});