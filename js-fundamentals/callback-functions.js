//To get the deferred Execution results we need to use callback functions
//Deferred Execution Task
var divideNumbers = function(a,b,fn){
    var result;
    setTimeout(function(){
        try{
            if (b==0)
            throw 'Cannot divide by Zero';
            //result is produced in a deferred manner
            result  = a / b;
            //invoke the function after result is produced and pass the result as an argument to it.
            fn(null,result);
        }catch(err){
            fn(err,null);
        }
    },1000);
    //return result; //Not required(we should not return values)
}

//Callback function should have first argument to hold the error
divideNumbers(25,5,function(err,divideResult){
    if(err) {
        console.log('Error:'+err); 
        return;
    }
    console.log('Result:'+divideResult);
});
