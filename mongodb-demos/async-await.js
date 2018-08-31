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

//Produce Random Number and square it
randomNumber().then((data)=>{
    console.log(`Random Number Generated : ${data}`);
    squareNumber(data).then((res)=>{
        console.log(`Squaring the Number :${res}`);
    });
});