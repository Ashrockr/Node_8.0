const fs = require('fs');
const path = require('path');
var fileName = path.join(__dirname,'sample.txt');
fs.unlink(fileName, (err) => {
  if (err){ 
      console.log(err.message);
      return;
  }
  console.log('Successfully deleted '+fileName);
});

var str = "asdfasdf";
str = str.replace("a","A");
console.log(str);