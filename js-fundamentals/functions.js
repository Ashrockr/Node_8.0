//Named Function (we can reuse it)
var addNumbers=function(a,b){
    return a + b;
};
console.log(typeof(addNumbers));
console.log(addNumbers('5',6));//Invoking the function 

//Self Invoking anonymous(function without a name cannot be reused) function, IIFE(Immediately invoking Function Expression)
var result = (function(a,b){
    //console.log(a+b);
    return a + b;
})(5,5);
console.log(result);

var printNumber = function(n){
    console.log('Number: '+n);
}

//HOF - Higher Order Function (Function takes another function as its argument to complete its task)
var numbers = [4,87,54,32,98];
numbers.forEach(printNumber);

//Function returns another function
function add(a){
    return function(b){
        return a + b;
    };
    //b cannot be accessed here 
}

var result = add(5)(6);
console.log(result);




