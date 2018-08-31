const express = require('express');
const app = express();

//GET : http://localhost:3000
app.get('/',(req,res)=>{
    res.send('<h1>Welcome to JS unit Testing</h1>');
});

//POST : http://localhost:3000
app.post('/',(req,res)=>{
    res.json({name:'Karthik'});
});

module.exports = app;
