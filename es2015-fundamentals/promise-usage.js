var divideNumbers = function (a, b) {
    var result;
    return new Promise(function (resolve, reject) {
        setTimeout(function () {
            try {
                if (b == 0)
                    throw 'Cannot divide by Zero';
                result = a / b;
                resolve(result);
            } catch (err) {
                reject(err);
            }
        }, 1000);
    });
}

/*
divideNumbers(25,0).then((res)=>{
    console.log(`Divide Result : ${res}`);
},(err)=>{
    console.log(`Error : ${err}`);
});*/

divideNumbers(25,0).then((res)=>{
    console.log(`Divide Result : ${res}`);
}).catch((err)=>{
    console.log(`Error : ${err}`);
});