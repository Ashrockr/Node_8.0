const bycryptjs = require('bcryptjs');

var dataToBeEncrypted = 'Karthik works in Capgemini.';

var encryptedData = bycryptjs.hashSync(dataToBeEncrypted);
console.log(encryptedData);

var result = bycryptjs.compareSync('Karthik works in Capgemini.',encryptedData);
if(result){
    console.log('Matched');
}else{
    console.log('Not Matched');
}