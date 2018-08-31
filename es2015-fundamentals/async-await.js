var randomNumber = ()=>new Promise((resolve,reject)=>{
    setTimeout(()=>{
        //Resolved with Random number between 0 to 10
        resolve(Math.round(Math.random()*10));
    },1000)
});

var squareNumber = (n)=>new Promise((resolve,reject)=>{
    setTimeout(()=>{
        //Square the given number
        resolve(n*n);
    },500)
});

/*
randomNumber().then((data)=>{
    console.log(data);
});

squareNumber(5).then((data)=>{
    console.log(data);
});*/

//Produce Random Number and square it using Promise
/*randomNumber().then((data)=>{
    console.log(`Random Number Generated : ${data}`);
    squareNumber(data).then((res)=>{
        console.log(`Squaring the Number :${res}`);
    });
});*/

/*Produce Random Number and square using async await */

(async()=>{ //function with await needs to be marked with async
    var number = await randomNumber(); //Await can be used for any promise
    console.log(`Random Number Generated : ${number}`);
    var square = await squareNumber(number);
    console.log(`Squaring the Number :${square}`);
})();


