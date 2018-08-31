const mongodb = require('mongodb'); //official npm package to connect MongoDB from node.js

const MongoClient = mongodb.MongoClient;

var uri = 'mongodb://127.0.0.1:27017/SampleDB'

MongoClient.connect(uri,{ useNewUrlParser: true },(err,db)=>{
    if(err){
        console.log(err);
        return;
    }
    console.log(`Connected to the database : SampleDB`);
    db.close();
    console.log('Connection Closed');
});