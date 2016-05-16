var express = require('express');
var app = express();
app.set('port', process.env.PORT || 1999);
var handlebars = require('express-handlebars').create({ defaultLayout:'main' });
app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');
app.use(express.static(__dirname + '/public'));
app.use(require('body-parser').urlencoded({extended:true}));
var credentials = require('./credentials.js');
var mongoose = require('mongoose');
mongoose.connect(credentials.mongo);


var bookPost = require('./models/bookpost.js');
var kitchenPost = require('./models/kitchenpost.js');
var wardrobePost = require('./models/wardrobepost.js');
var gearPost = require('./models/gearpost.js');
var miscPost = require('./models/miscpost.js'); 

app.get('/',function(req,res){
	res.render('index');
}); 

app.get('/books',function(req,res){
	bookPost.find({},function(err,bookposts){
		res.render('books',{bookposts: bookposts});
	});
});

app.get('/kitchen',function(req,res){
	kitchenPost.find({},function(err,kitchenposts){
		res.render('kitchen', {kitchenposts: kitchenposts});
	});
});

app.get('/wardrobe',function(req,res){
	wardrobePost.find({},function(err,wardrobeposts){
		res.render('wardrobe', {wardrobeposts:wardrobeposts});
	});
});

app.get('/gear',function(req,res){
	gearPost.find({},function(err,gearposts){
		res.render('gear', {gearposts:gearposts});
	});
});

app.get('/misc',function(req,res){
	miscPost.find({},function(err,miscposts){
		res.render('misc', {miscposts:miscposts});
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
		res.redirect('/wardrobe'); 
	});
});

app.post('/gearpost',function(req, res){
	new gearPost({
	youname: req.body.youname,
	youlink: req.body.youlink,
	title: req.body.title,
	description: req.body.description,
	imgurl: req.body.imgurl,
	shopurl: req.body.shopurl, 
	uses: req.body.uses,
	interacts: req.body.interacts, 
}).save(function(err){
		if (err){ console.log(err);}
		res.redirect('/gear'); 
	});
});

app.post('/miscpost',function(req, res){
	new miscPost({
	youname: req.body.youname,
	youlink: req.body.youlink,
	title: req.body.title,
	description: req.body.description,
	imgurl: req.body.imgurl,
	shopurl: req.body.shopurl, 
}).save(function(err){
		if (err){ console.log(err);}
		res.redirect('/misc'); 
	});
});

app.use(function (req,res,next) {
	res.status(404);
	res.render('404');
});

app.use(function (err, req, res, next) {
	console.error(err.stack);
	res.status(500);
	res.render('500');
});

app.listen(app.get('port'), function(){
	console.log( 'Express started on http://localhost:' +
    app.get('port') + '; press Ctrl-C to terminate.' );
});