const EventEmitter = require('events');

class AppEventEmitter extends EventEmitter{
    constructor(){
        super();
    }
}
const appEventEmitter = new AppEventEmitter();
/*
//Custom Event with listener Function(Function tiggers when the corresponding event occurs)
appEventEmitter.addListener('cgEvent',()=>{ //Listener Function
    console.log('cgEvent Occured');
});

//Trigger the custom event
setInterval(()=>{
    appEventEmitter.emit('cgEvent');
},1000);*/


var listenerFunction01 = (args)=>{
    console.log(`Custom Event occured and invoked listenerFunction01 with the args value: ${args}`);
}

var listenerFunction02 = (args)=>{
    console.log(`Custom Event occured and invoked listenerFunction02 with the args value: ${args}`);
}

//Hooking up the Listener function to a custom Event (Subscribing)
appEventEmitter.addListener('customEvent',listenerFunction01);
appEventEmitter.on('customEvent',listenerFunction02);

//Remove a Listener (Unsubscribing)
//appEventEmitter.removeListener('customEvent',listenerFunction02);

//Remove all Listeners (Unsubscribing)
//appEventEmitter.removeAllListeners('customEvent');

//Trigger the custom event
appEventEmitter.emit('customEvent','Capgemini');
