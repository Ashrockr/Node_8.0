var mongoose = require('mongoose');

var Image = mongoose.model('Image', {
    img: { data: Buffer, contentType: String }
}, 'images');

module.exports = Image;