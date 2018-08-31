var divideNumbers = (a, b, fn) => {
    var result;
    setTimeout(() => {
        try {
            if (b == 0)
                throw 'Cannot divide by Zero';
            result = a / b;
            fn(null, result);
        } catch (err) {
            fn(err, null);
        }
    }, 1000);
}

//3rd party module to convert callback to promise
const bluebird = require('bluebird');

//Convert callback to promise
var divideNumbersPromise = bluebird.promisify(divideNumbers);

//Handle callback as promise
divideNumbersPromise(25, 5).then((result) => {
    console.log(`Result : ${result}`);
}).catch((err) => {
    console.log(`Error : ${err}`);
});

//Converting entire package callbacks to promise
const fs = bluebird.promisifyAll(require('fs'));

//callback methods in filesystem will get convert to promise which can be accessed by suffixing Async
fs.readFileAsync('demo.txt', 'utf-8').then((data) => {
    console.log(data);
}).catch((err) => {
    console.log(err);
});



