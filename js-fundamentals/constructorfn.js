/*ECMA International sets the standard for Scripting languages */
/*ES1, ES2, ES3, ES4, ES5*, ES6 (ES2015), ES 2016, ES2017 */
//All browser JS Engines can support ES5 100% I.E 11.0(Chakra), Chrome(V8), Firefox(Spidermonkey)
//IE 11.0 supports only 11% of ES2015 Specifications
//Google Chrome latest version supports 98% of ES2015 Specificatons
//Safari latest version supports 100% of ES2015 Specificatons
//Node Environment > 8  supports 100% of ES2015 Specification

//Still all browsers are not supporting the Core Functionalities for ES6 Standrds 
//we can use compilers like Babel, TypeScript, Traceur to compile the code 
//from ES2015 to ES5

//Online TypeScript compiler : http://www.typescriptlang.org/play/index.html

//Node.js Platform supports 100% of ES6 standards no need to use any Compilers to compile it to ES5

/*ES6 is also loosely Typed (var i = 5; int i = 5)*/

//As per ES5 Specifications function is a first class citizen for JS. 
//We need to implement feautres like class, inheritance .. using functions only

/* Java / C#  - This is not supported in ES5*/
/*class Foo{
    private int id;
    private string name;
    public Foo(id,name){
        this.id = id;
        this.name = name;
    }
    public printFooDetails(){
        console.log('Id:'+this.id+' Name: '+this.name);
    }
}

Foo fooObj =new Foo(1,'Karthik');
fooObj.printFooDetails();*/

//In ES5 - Constructor Function
   
function Foo(id,name){
    this.id = id;
    this.name = name;
}

Foo.prototype.printFooDetails=function(){
    console.log('Id:'+this.id+' Name: '+this.name);
}

var fooObj01 =new Foo(1,'Karthik');
var fooObj02 =new Foo(2,'Ganesh');
fooObj01.printFooDetails();
fooObj02.printFooDetails();
console.log(fooObj01); //Object Literal
console.log(fooObj01 instanceof Foo);//true
console.log(fooObj01 instanceof Object);//true (Prototypal Inheritance)




