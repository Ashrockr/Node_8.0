const express = require('express');
var app = express();
app.use('/',function(req,res,next){
    res.send('Working');
    console.log("request");
    next();
})

app.listen(3000,()=>{
    console.log("started");
})
class Foo{
    //Access specifiers is not supported
    constructor(){
        this.id=1;
    }    
    getFooDetails(){
        //console.log('Id: '+this.id);//ES5
        console.log(`Id: ${this.id}`);//String Interpolation in ES2015
    }
}
const foo1 = new Foo();
var foo = foo1;
foo = new Foo();
console.log(foo.getFooDetails());