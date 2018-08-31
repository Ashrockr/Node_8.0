var promiseObj = new Promise(function(resolve,reject){
    resolve(5);
    //reject('Some Error Occured');
});
console.log(promiseObj.constructor.name);

promiseObj.then((result)=>{
    console.log(`Promise FullFilled : ${result}`);
},(err)=>{
    console.log(`Promise Rejected : ${err}`);
});