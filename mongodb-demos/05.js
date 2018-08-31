const mongoose = require('mongoose');
const Config = require('./config');

var uri = Config.MongoURI;

mongoose.connect(uri, { useNewUrlParser: true }).then(() => {
    //Creating Location Model
    var Location = mongoose.model('Location', {
        _id: Number,
        location: String
    }, 'locations');

    //Get all the locations (documents) from the collection locations from SampleDB
    /*Location.find((err, docs) => {
        if (err) { console.log(err); return; }

        docs.forEach((doc)=>{
            console.log(`Id : ${doc.id} Location : ${doc.location}`);
        });
        mongoose.connection.close();
    });*/

    //To get the matching document using findById()
    /*Location.findById(8).then((doc)=>{
        console.log(`Id : ${doc.id} Location : ${doc.location}`);
        mongoose.connection.close();
    }).catch((err)=>{
        console.log(`No Document Found`)
    });*/

    //To get matching documents using chaining
    let query = Location.where('_id').gte(2).lt(6).where('location').equals('Chennai');

    //Executing the query with promise
    query.exec().then((docs)=>{
        console.log(docs);
        mongoose.connection.close();
    }).catch((err)=>{
        console.log(`Error : ${err}`);
    });



}).catch((err) => {
    console.log(`Error : ${err}`);
});


/*Model : Location
{ "_id" : 1, "location" : "Bangalore" }
*/