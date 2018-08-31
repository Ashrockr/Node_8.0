//var numbers = [5,false,'fdf'];//Bad practice (JS is loosely typed)

var numbers = [5,10,15,20,25]; //Array index starts 0 
console.log(numbers.length); //5 //Length is a property

//Add an item at the last
numbers.push(30);

//Remove an item at the last
numbers.pop();

//Remove the element from the specific index
numbers.splice(numbers.indexOf(15),1);

//Update the element at the specific index
numbers.splice(numbers.indexOf(10),2,100,10000);

//Add an item at the front
numbers.unshift(1000);

console.log(numbers);

//Libraries, Modules(Nodejs Environment)
//Data Manipulation : lodash, underscorejs
//DOM Manipulation : jQuery


//To download JS Library : https://cdnjs.com/
//To download node Modules (Third PArty Modules) : https://www.npmjs.com/

//[{},{},{}]//Array of Objects
//[[],[],[],[]]//Array of Arrays
