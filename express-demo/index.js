//express package is build on the top of connect

const express= require('express');
const bodyParser = require('body-parser');
const path = require('path');

var app = express();

//Creating Router using express Router
var root = express.Router();
var admin = express.Router();

app.set('view engine','pug');
app.set("views",path.join(__dirname,'views'));

//Middleware Section
//To parse the data to js object if the content-type is application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({extended:false})); //extended : true it will support nested objects

//To parse the data to js object if the content-type is application/json
app.use(bodyParser.json());

app.use('/',root); //Root Route
app.use('/admin',admin); //Admin Route

//POST: http://localhost:3000/admin/person
//Post the person details in the request body using POSTMAN
admin.post('/person',(req,res,next)=>{
    //To access the data posted in the request body and parde from json to JS Object
    console.log(req.body);//print js Object
    var personObj = req.body;//personObj is a js object
    //Converting the js object to json and send as a response
    res.json(personObj);
});

//GET: http://localhost:3000/admin/person/superadmin/mumbai
admin.get('/person/:role/:city',(req,res,next)=>{ //:role and :city are path parameters
   //To access the path parameter /:role passed in the URL
   var role = req.params['role'];
   //To access the path parameter /:city passed in the URL
   var city = req.params['city'];
   res.send(`<h1>Person Role : ${role} City: ${city}</h1>`);
});

//GET: http://localhost:3000/admin/person?name=Karthik&city=Bangalore
admin.get('/person',(req,res,next)=>{
    //To access the query string passed in the URL
    var query = req.query; // {name:'Karthik',city:'Bangalore'}
    res.send(`<h1>Person Details Name : ${query.name} City: ${query.city}</h1>`);
});

//GET: http://localhost:300/admin/err
admin.get('/err',(req,res,next)=>{
    try {
        throw 'error occured in admin route';
    } catch (error) {
        next({msg:error,errNumber:101});
    }
});

//GET : http://localhost:3000/admin
admin.get('/',(req,res,next)=>{
    res.write('<h1>Express - Administrator Page</h1>');
    res.end();
});


//GET : http://localhost:3000
root.get('/',(req,res,next)=>{
    //res.end('<h1>Express-GET</h1>');
    res.render('index',{title:'Express',locations:['Bangalore','Chennai','Mumbai']});
});

//POST : http://localhost:3000
root.post('/',(req,res,next)=>{
    res.write('<h1>Express - POST</h1>');
    res.end();
});

//PUT : http://localhost:3000
root.put('/',(req,res,next)=>{
    res.write('<h1>Express - PUT</h1>');
    res.end();
});

//DELETE : http://localhost:3000
root.delete('/',(req,res,next)=>{
    res.write('<h1>Express - DELETE</h1>');
    res.end();
});

//middleware catches all the routes which executes for error handling
app.use((err,req,res,next)=>{
    res.write('<h1>Error Page</h1>');
    res.write('<hr>');
    res.write(`<h2>Exception : ${err.msg} Error No: ${err.errNumber}</h2>`);
    res.end();//closing the response stream
});

app.listen(3000,()=>{
    console.log('Sever started at localhost 3000');
});
