var mongoose = require('mongoose');

var gearpostSchema = mongoose.Schema({
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
        uses: String,
        interacts: String,
});

var gearPost = mongoose.model('gearPost', gearpostSchema);
module.exports = gearPost;