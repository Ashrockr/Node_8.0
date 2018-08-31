const express = require('express');
const bodyParser = require('body-parser');
const _ = require('lodash'); //Library to perform Data Manipulation

var app = express();

//Creating routes
var root = express.Router();
var api = express.Router();

//Parsing Request Body details to JavaScript Objects using 3rd party middleware body-parser
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use('/', root);
app.use('/api/guests', api);

guests = [
    { id: 1, name: 'Karthik', contactNumber: '9986173092' },
    { id: 2, name: 'Ganesh', contactNumber: '9986173093' },
    { id: 3, name: 'Logith', contactNumber: '9986173094' }
];

//To get all the guest details using RESTful Services
//GET : http://localhost:3000/api/guests
api.get('/', (req, res, next) => {
    res.status(200).json(guests);
});

//To get sepcific guest details using RESTful Services
//GET : http://localhost:3000/api/guests/1
api.get('/:id', (req, res, next) => {
    // var id = parseInt(req.params['id']);
    var id = parseInt(req.params.id); //1

    //searching for the guest from the guest collection with the id 1 using lodash
    var guestObject = _.find(guests, (guest) => guest.id == id);

    if (guestObject !== undefined) {
        //If Guest Found
        res.status(200).json(guestObject);
    } else {
        //If Guest not Found
        res.statusMessage = 'Guest Not Found';
        res.status(404).send();
    }
});

//To add the Guest
//POST : http://localhost:3000/api/guests
api.post('/',(req,res,next)=>{
    //creating guest object by taking the details from the request body which is parsed as js object by body-parser
    var guest = {
        id : req.body.id,
        name: req.body.name,
        contactNumber: req.body.contactNumber
    }

    //Adding the guest details in the collection
    guests.push(guest);

    //Acknowleding client that guest added successfully by sending the new guest object in the response with the status code 201
    //Endpoint to access the newly created resource need to set in the response location header
    res.setHeader('location',`${req.originalUrl}/${guest.id}`);
    res.status(201).json(guest);

});

//To Update the Guest
//PUT : http://localhost:3000/api/guests/1
api.put('/:id',(req,res,next)=>{
    var id = parseInt(req.params.id);

    var updatedGuest = {
        id : id,
        name: req.body.name,
        contactNumber: req.body.contactNumber
    }

    //Update the guest details into the collection

    //find the guest index using _.findIndex
    var guestIndex = _.findIndex(guests,{id:id});

    //Replace guest at index using native splice method
    guests.splice(guestIndex,1,updatedGuest);

    res.statusMessage = 'Guest Updated';
    res.status(202).send();
});

//To delete the guest
//DELETE : http://localhost:3000/api/guests/1
api.delete('/:id',(req,res,next)=>{
    var id = parseInt(req.params.id);

    //find the guest index using _.findIndex
    var guestIndex = _.findIndex(guests,{id:id});

    //Remove the guest from collection using native splice method
    guests.splice(guestIndex,1);

    res.statusMessage = 'Guest Deleted';
    res.status(204).send();
});




root.get('/', (req, res, next) => {
    res.send('<h1>Welcome to RESTful services</h1>');
});

app.listen(3000, () => {
    console.log('Server started and listening on port 3000');
});

/*
guests = [{id:1,name:'Karthik'},{id:2,name:'Karthik'},{id:3,name:'Karthik'}]

CRUD Operations
----------------
GetAllGuests() - GET
GetGuestById() - GET
AddGuest(newGuestDetails) - POST
UpdateGuest(id,updateGuestDetails) - PUT
DeleteGuest(id) - DELETE
*/