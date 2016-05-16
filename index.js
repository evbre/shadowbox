var express = require('express');
var app = express();
//set port
app.set('port', process.env.PORT || 1999);

// set up handlebars view engine
var handlebars = require('express-handlebars').create({ defaultLayout:'main' });
app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');

// set up the public directory to serve static files
app.use(express.static(__dirname + '/public'));

//body parser -- for form processing
app.use(require('body-parser').urlencoded({extended:true}));

// bring in db credentials
var credentials = require('./credentials.js');

// mongoose
var mongoose = require('mongoose');
mongoose.connect(credentials.mongo);

// model
var bookPost = require('./models/bookpost.js');
var kitchenPost = require('./models/kitchenpost.js');
var wardrobePost = require('./models/wardrobepost.js');
// ------ routes -------- //

/*app.get('/populate',function(req,res){
	new Message({
		username: 'robyn',
		title: 'Hello',
		body: 'Hello from the outside'
	}).save(function(err){
		if (err){ console.log(err); }
		res.send('saved');
	});
});*/
// show all the top-level (parent) messages
app.get('/',function(req,res){
	res.render('index');
}); 

// show a thread

app.get('/kitchen',function(req,res){
	kitchenPost.find({},function(err,kitchenposts){
		res.render('kitchen', {kitchenposts: kitchenposts});
	});
});

app.get('/books',function(req,res){
	bookPost.find({},function(err,bookposts){
		res.render('books',{bookposts: bookposts});
	});
});

app.get('/wardrobe',function(req,res){
	wardrobePost.find({},function(err,wardrobeposts){
		res.render('wardrobe', {wardrobeposts:wardrobeposts});
	});
});


app.post('/kitchenpost',function(req, res){
	new kitchenPost({
		youname: req.body.youname,
		youlink: req.body.youlink,
		title: req.body.title,
		description: req.body.description,
		imgurl: req.body.imgurl,
		shopurl: req.body.shopurl,
		foods: req.body.foods,
	}).save(function(err){
		if (err){ console.log(err);}
		res.redirect('/kitchen'); 
	});
}); 

app.post('/bookpost',function(req, res){
	new bookPost({
	youname: req.body.youname,
	youlink: req.body.youlink,
	title: req.body.title,
	author: req.body.author,
	description: req.body.description,
	imgurl: req.body.imgurl,
	shopurl: req.body.shopurl, 
	readingsitch: req.body.readingsitch,
	}).save(function(err){
		if (err){ console.log(err);}
		res.redirect('/books'); 
	});
});

app.post('/wardrobepost',function(req, res){
	new wardrobePost({
	youname: req.body.youname,
	youlink: req.body.youlink,
	title: req.body.title,
	description: req.body.description,
	imgurl: req.body.imgurl,
	shopurl: req.body.shopurl, 
	season: req.body.season,
	occasion: req.body.occasion, 
}).save(function(err){
		if (err){ console.log(err);}
		res.redirect('/books'); 
	});
});
// 404
app.use(function (req,res,next) {
	res.status(404);
	res.render('404');
});

// 500
app.use(function (err, req, res, next) {
	console.error(err.stack);
	res.status(500);
	res.render('500');
});

// listen
app.listen(app.get('port'), function(){
	console.log( 'Express started on http://localhost:' +
    app.get('port') + '; press Ctrl-C to terminate.' );
});