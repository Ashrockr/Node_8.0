class Employee{
    constructor(){
        console.log('Employee Constructor Invoked');
    }
}

class Manager extends Employee{
    constructor(){
        super();//Base Constructor
        console.log('Manager Constructor Invoked');
    }
}

new Manager();