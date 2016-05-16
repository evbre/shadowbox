var mongoose = require('mongoose');

var bookpostSchema = mongoose.Schema({
        datetime: {
            type:Date,
            default:Date.now
        },
        bookposts: [{youname: String,
        youlink: String,
        title: String,      
        author: String,
        description: String,
        imgurl: String,
        shopurl: String,
        readingsitch: String
        }]
});

var bookPost = mongoose.model('bookPost', bookpostSchema);
module.exports = bookPost;