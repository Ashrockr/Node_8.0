const mongoose = require('mongoose');
const Configs = require('./config');

var uri = Configs.MongoURI;

mongoose.connect(uri, { useNewUrlParser: true }).then(() => {
    //Creating model / schema using mongoose ODM
    var Department = mongoose.model('Department', { name: String }, 'departments');

    //Creating the instance with the document for the model created
    var department = new Department({ name: 'Training' });

    //We can do  the same with callback
    department.save().then((doc)=>{
        console.log(doc);//Wil print the doc with generated _id
        console.log('Document Inserted');
        mongoose.connection.close();
    }).catch((err)=>{
        console.log(`Error : ${err}`);
    });
}).catch((err) => {
    console.log(`Error : ${err}`);
});

/* Model that we are going to create
department  : {_id,name}
*/