var mongoose = require('mongoose');

var wardrobepostSchema = mongoose.Schema({
        datetime: {
            type:Date,
            default:Date.now
        },
        youname: String,
        youlink: String,
        title: String,      
        description: String,
        imgurl: String,
        shopurl: String,
        season: String,
        occasion: String,
});

var wardrobePost = mongoose.model('wardrobePost', wardrobepostSchema);
module.exports = wardrobePost;