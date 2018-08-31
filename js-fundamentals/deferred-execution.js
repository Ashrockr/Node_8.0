//JavaScript is Single Threaded- Thread Never Sleeps(Thread.Sleep)
//In js we can invoke functions through events(make the tasks to execute in a deferred manner - delayed manner) 
//by 1. Timer Events, 2. User Event(Click), 3. XHR Event (Ajax)

(function(){
    console.log('1');
    console.log('2');
    setTimeout(function(){
        console.log('5'); 
    },5000); 
    setTimeout(function(){
        console.log('4'); 
    },10); //Time specified here is to place the task(function) into the callback queue
    console.log('3');
    //for(;;){} //infinite loop executed in main stack
 })();

 //Event loop will check whether the main stack is empty,
 // if it finds empty it takes the function from callback queue and put it in main stack for execution