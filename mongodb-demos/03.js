const mongoose = require('mongoose');
const Config = require('./config');
var uri = Config.MongoURI;

//Using Promise
/*mongoose.connect(uri, { useNewUrlParser: true }).then(()=>{
    var connection = mongoose.connection;
    console.log(`Connected to Database : ${connection.db.databaseName}`);
    connection.close();
    console.log('Connection Closed');
}).catch((err)=>{
    console.log(`Error : ${err}`);
});*/


//using async await
(async()=>{
    try{
        var mongooseConnection = await mongoose.connect(uri, { useNewUrlParser: true });
        var connection = mongooseConnection.connection;
        console.log(`Connected to Database : ${connection.db.databaseName}`);
        connection.close();
        console.log('Connection Closed');
    }
    catch(err){
        console.log(`Error : ${err}`);
    }
})();
