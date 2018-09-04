const mongoose = require('mongoose');

var User = mongoose.model('User', {
    name: {
        type: String,
        require: true,
    },
    password : {
        type : String,
        require : true,
        match: [
            /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z])[a-zA-Z0-9!@#$%^&*]{6,16}$/, 
            'Must contain atleast one lower-case, one uppercase, one number, one special character and should of length 6 -16'
        ]
    },
    admin : {
        type : Boolean,
        default : false
    }
}, 'users');

module.exports = User;