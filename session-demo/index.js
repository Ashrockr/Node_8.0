	
	const express = require('express');
	const cookieParser = require('cookie-parser');
	const session = require('express-session'); 
	const MongoStore = require('connect-mongo')(session); 

	var app = express();

	app.use(cookieParser());
	app.use(session({
		store : new MongoStore({
			"db": "SessionDB",
			"host": "localhost",
			"port": "27017",
			"collection": "sessions"
		}),
		cookie: { maxAge: 50 * 1000 }, /* 5 min */
		secret:'CGKarthik', 
		resave: true,  
		saveUninitialized: true
	}));
	
	app.get('/', function(req, res) {
		console.log('home : '+req.sessionID);
		if(req.session.lastPage) {
			res.write('Last page was: ' + req.session.lastPage + '.\n');
		}
		req.session.lastPage = 'Home';
		res.end('Home Page');
	});

	app.get('/about', function(req, res) {
		console.log('about : '+req.sessionID);
		if(req.session.lastPage) {
			res.write('Last page was: ' + req.session.lastPage + '.\n');
		}
		req.session.lastPage = 'AboutUs';
		res.end('About us');
	});

	app.get('/logout', function(req, res) {
		req.session.destroy();
		res.redirect("/");
	});
	
	app.listen(process.env.PORT || 3000);
	console.log('Server listening on the port 3000');
	
	