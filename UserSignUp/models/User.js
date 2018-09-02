var mongoose = require('mongoose');
var User = mongoose.model('User',{
    name : {
        type : String,
        require : true
    },
    password : {
        type : String,
        require : true
    }
});

module.exports = User;