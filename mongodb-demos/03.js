const mongoose = require('mongoose');
const Config = require('./config');
var uri = Config.MongoURI;

mongoose.connect(uri, { useNewUrlParser: true }).then(()=>{
    var connection = mongoose.connection;
    console.log(`Connected to Database : ${connection.db.databaseName}`);
    connection.close();
    console.log('Connection Closed');
}).catch((err)=>{
    console.log(`Error : ${err}`);
});