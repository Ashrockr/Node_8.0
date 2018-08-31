const fs = require('fs');
const path = require('path');

var filePath = path.join(__dirname,'intrvo.txt');

//Reading the contents of file using synchronous method
/*console.log('Started Reading..');
var buffer = fs.readFileSync(filePath,{encoding:'utf-8'});
console.log(buffer);
console.log('Completed Reading...');*/

//Reading the contents of file using asynchronous method (Recommended)
console.log('Started Reading..');
fs.readFile(filePath,{encoding:'utf-8'},(err,data)=>{
    if(err) {
        console.log(err); 
        return;
    }
    console.log(data);
    console.log('Completed Reading...');
});
