/* 5 Primitives in JS
number : 5645.464364363463
string : 'Capgemini'
boolean : true / false
undefined
null
*/

var numberVar = 5;
var stringVar = 'Capgemini';
var booleanVar = false;
var undefinedVar;
var nullVar = null;
console.log(numberVar);//Print the Value stored in the varaible
console.log(typeof (numberVar));//Print the type (number,string,boolean,undefined,object)

var dt = new Date();
console.log(typeof(dt));//Base Type
console.log(dt.constructor.name);//Instance Type

console.log(4 == '4');//true - JS is loosely typed
console.log(4 === '4');//false - Check the data with its datatype


