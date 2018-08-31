//connect is third party module build on the top of http module
//connect is a middleware package
//we can place middleware in the http pipeline and intercept the HTTP Request and response

const connect = require('connect');
var app = connect(); //Create the server

//Creating Middleware function which takes 3 arguments : req, res, next
/*app.use((req,res,next)=>{
    console.log('Logger middleware 1 executed');
    next();
});

app.use((req,res,next)=>{
    console.log('Authentication middleware 2 executed');
    next();
});

app.use((req,res,next)=>{
    console.log('Another Middleware 3 executed');
    next();
});*/

//http://localhost:3000/error
app.use('/error',(req,res,next)=>{
    //handling exception in the middleware
    try{
        //Risky Code
        throw 'Some Error occured';
    }catch(err){
        next({error:err}); //passing err in the next middleware will execute the middleware with 4 arguments
    }
});

//http://localhost:3000/admin
app.use('/admin',(req,res,next)=>{
   console.log('Admin Logger');
   next();
});

//http://localhost:3000/admin
app.use('/admin',(req,res,next)=>{
    res.write('<h1>Welcome to Admin Page</h1>');
    res.end();//Closing the Response Writable Stream
    //next();//here next is optional it does not have any meaning
});

//http://localhost:3000/
app.use('/',(req,res,next)=>{
   console.log('Home Logger');
   next();
});

//http://localhost:3000/
app.use('/',(req,res,next)=>{
    res.write('<h1>Welcome to Connect</h1>');
    res.end();//Closing the Response Writable Stream. It wont call the next middleware in the chain it terminates the Process and the sens the response to the client
    //next();
});

//Creating thre middleware which need to be executed for exception handling
//Exception handling middleware needs to placed at the last
//first arguments must be err(which is used to recieve the experion details)
app.use((err,req,res,next)=>{
    console.log(err);
    res.end('<h1>Some Error occured it has been reported.</h1>');
});

//Listen on port 3000
app.listen(3000,()=>{
    console.log('Server started listening on port 3000 at localhost');
});

