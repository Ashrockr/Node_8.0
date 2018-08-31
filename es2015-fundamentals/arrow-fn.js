//In ES5
var add = function (a, b) {
    return a + b;
}

//In ES2015
var addNumbers = (a, b) => a + b;

//In JS all functions by default return this (current instance)
/*var Employee = function(){
    //return this;
    //this.id = 100
} //new Employee() returns Employee { id: 100 } -> this*/

//IN ES5
/*
(function(){
    this.counter = 0;
    setInterval(function(){
        //it will try to access the counter property from the current instance not from the parent
        console.log(`Counter = ${this.counter++}`);
    }.bind(this),1000);//bind() is used to bind the outer instance with the inner function
})();*/

//IN ES 2015
(function(){
    this.counter = 0;
    setInterval(()=>{ //arrow functions are inline function with the access to current instance
        //it will try to access the counter property from the current instance not from the parent
        console.log(`Counter = ${this.counter++}`);
    },1000); //no need to use bind()
})();


