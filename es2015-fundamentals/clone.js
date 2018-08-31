//Primitive Types are Immutable
/*var i = 'CAPGEMINI';
var j = i; //It will create a new copy of the value
j = 'Capgemini India'; //It will produce new state. It is not referring the old state of i
console.log(i);//i wont be changed
console.log(j);//j will have new state*/

//Object are Mutable
/*var foo = {i:5};
var baz = foo; //It creates reference
baz.i = 7;
console.log(foo);
console.log(baz);*/


var employee = {id:1,name:'Karthik'};//Mutable
//create a new state from mutable type
var clonedEmployee = Object.assign({},employee);//Cloning and produce new state
clonedEmployee.id=100;
console.log(employee);
console.log(clonedEmployee);


var numbers = [1,2,3,4];
var clonedNumbers = [...numbers]; //To clone array and produces new state
clonedNumbers[0]= 100;
console.log(numbers);
console.log(clonedNumbers);

//In js Objects and Arrays are Mutable





