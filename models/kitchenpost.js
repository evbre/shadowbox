var mongoose = require('mongoose');

var kitchenpostSchema = mongoose.Schema({
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
        foods: String
});

var kitchenPost = mongoose.model('kitchenPost', kitchenpostSchema);
module.exports = kitchenPost;