const os = require('os'); //Importing the module
const path = require('path');
console.log(`Host Name:${os.hostname}`);
console.log(`System Up time in seconds : ${Math.floor(os.uptime)}`);
console.log(path.join(__dirname,'index.html')); //To get the current working directory __dirname