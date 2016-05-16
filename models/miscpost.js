var mongoose = require('mongoose');

var miscpostSchema = mongoose.Schema({
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
});

var miscPost = mongoose.model('miscPost', miscpostSchema);
module.exports = miscPost;