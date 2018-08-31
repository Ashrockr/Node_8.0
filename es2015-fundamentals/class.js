class Foo{
    //Access specifiers is not supported
    constructor(id){
        this.id = id;
    }
    getFooDetails(){
        //console.log('Id: '+this.id);//ES5
        console.log(`Id: ${this.id}`);//String Interpolation in ES2015
    }
}
var fooObj = new Foo(101);
fooObj.getFooDetails();