const mongoose = require('mongoose');//mongoose is a ODM Library(Object Data Modeling)
const Configs = require('./config');

var uri  = Configs.MongoURI;

mongoose.connect(uri,{ useNewUrlParser: true },(err)=>{
    if(err){
        console.log(err);
        return;
    }
    var connection = mongoose.connection;
    console.log(`Connected to the database : ${connection.db.databaseName}`);
    connection.close();
    console.log('Connection Closed');
});