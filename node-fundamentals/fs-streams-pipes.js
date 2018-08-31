const fs = require('fs');

var readStream = fs.createReadStream('demo.txt',{
    encoding:'utf-8',
    highWaterMark:50 //Specifying the chunk size (50 bytes). Default ins 16 KB.
});

var writeStream = fs.createWriteStream('demo-copy.txt',{
    encoding:'utf-8'
});

/*
readStream.on('open',()=>{
    //This Listener will get triggered once the file is opened for reading.
    console.log('File Opened for Reading / Copying ...');
});

readStream.on('data',(chunk)=>{
    //This Listener will get triggered once the file is started reading.
    console.log('Reading...');
    console.log(chunk);
    console.log('Copying...');
    //Write in demo-copy.txt
    writeStream.write(chunk.replace('Karthik','Ganesh'));
});

readStream.on('close',()=>{
    //This Listener will get triggered once the file is completed its reading.(Reached EOF)
    console.log('Completed Reading / Copying ...');
});
*/

console.log('Copying....');
//Pipe readable stream into writable stream
readStream.pipe(writeStream);
console.log('Copied');


