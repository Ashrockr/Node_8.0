const express = require('express');
const mongoose = require('mongoose');

var app = express();
var root = express.Router();
var api = express.Router();

//Connect and Open MongosDB
var uri = 'mongodb://localhost/SampleDB';

mongoose.connect(uri, { useNewUrlParser: true }).then(() => {
    
    console.log('MongoDB Connected');

    //Creating Location Model
    var Location = mongoose.model('Location', {
        _id: Number,
        location: String
    }, 'locations');

    app.use('/', root);
    app.use('/api/locations', api);

    //Reading documents from locations collection from SampleDB and sending as json
    //GET : http://localhost:3000/api/locations
    api.get('/', (req, res, next) => {
        var locations = [];
        Location.find().then((docs) => {
            docs.forEach((doc) => {
                //Changing _id to id by iterating the documents
                locations.push({ id: doc._id, location: doc.location });
            });
            res.status(200).json(locations);
        }).catch((err) => {
            console.log(err);
            // next(err);
        });
    });

    app.listen(3000, () => {
        console.log('Sever Started at localhost 3000');
    });

}).catch((err) => {
    console.log(err);
});

