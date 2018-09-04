var mongoose = require('mongoose');
var User = mongoose.model('User',{
    name : {
        type : String
    },
    password : {
        type : String,
        require : true
    },
    email : {
        type : String,
        require : true
    },
    gender : {
        type : String,
        enum: {
            values: ['Male','Female'],
            message: 'For `{PATH}` the value `{VALUE}` is not valid. Only Male or Female allowed'
        }
    },
    isAdmin : {
        type : Boolean,
        default:false
    }
});

module.exports = User;