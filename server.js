(function() {
	'use strict';
	
	var express = require('express');
	var app = express();
	var http = require('http').Server(app);
	var io = require('socket.io')(http);
	var path = require('path');
	var mongoose = require('mongoose');

	//connect to mongoose
	mongoose.connect('mongodb://localhost/');
	// var _0xe2ba=["\x6D\x6F\x6E\x67\x6F\x64\x62\x3A\x2F\x2F\x61\x64\x6D\x69\x6E\x3A\x61\x64\x6D\x69\x6E\x40\x64\x73\x30\x32\x33\x34\x33\x35\x2E\x6D\x6C\x61\x62\x2E\x63\x6F\x6D\x3A\x32\x33\x34\x33\x35\x2F\x68\x65\x72\x6F\x6B\x75\x5F\x6B\x39\x68\x77\x70\x66\x6E\x33","\x63\x6F\x6E\x6E\x65\x63\x74"];mongoose[_0xe2ba[1]](_0xe2ba[0],function(_0x56efx1){if(_0x56efx1){throw _0x56efx1}});

	//CONFIGURATIONS
	// app.set('views', path.join(__dirname, 'app', 'client', 'views'));
	app.use(express.static(path.join(__dirname, 'app', 'client')));

	//ROUTES
	app.get('*', function(req, res) {
		res.sendFile(path.join(__dirname, 'app', 'client', 'views', 'index.html'));
	});

	//Initialize sockets
	require("./app/server/sockets/sockets")(io);
	//Initialize routes
	require('./app/server/routes')(app);

	//SERVER START
	app.set('port', (process.env.PORT || 3000));
	http.listen(app.get('port'), function() {
		console.log('listening on port: ' + app.get('port'));
	}); 

	exports = module.exports = app;
}());