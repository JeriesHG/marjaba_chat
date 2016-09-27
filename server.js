'use strict'
var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var path = require('path');
var mongoose = require('mongoose');

//connect to mongoose
mongoose.connect('mongodb://localhost/');
// var _0xe2ba=["\x6D\x6F\x6E\x67\x6F\x64\x62\x3A\x2F\x2F\x61\x64\x6D\x69\x6E\x3A\x61\x64\x6D\x69\x6E\x40\x64\x73\x30\x32\x33\x34\x33\x35\x2E\x6D\x6C\x61\x62\x2E\x63\x6F\x6D\x3A\x32\x33\x34\x33\x35\x2F\x68\x65\x72\x6F\x6B\x75\x5F\x6B\x39\x68\x77\x70\x66\x6E\x33","\x63\x6F\x6E\x6E\x65\x63\x74"];mongoose[_0xe2ba[1]](_0xe2ba[0],function(_0x56efx1){if(_0x56efx1){throw _0x56efx1}});

//Get Save Methods
var UserMethods = require('./app/UserMethods');
var userMethods = new UserMethods();

//CONFIGURATIONS
// app.set('views', path.join(__dirname, 'app', 'client', 'views'));
app.use(express.static(path.join(__dirname, 'app','client')));

//ROUTES
app.get('*', function(req, res) {
	res.sendFile(path.join(__dirname, 'app', 'client', 'views', 'index.html'));
});

//IO CONNECTIONS
io.on('connection', function(socket) {
	console.log('a user connected');

	userMethods.retrieveModel.find(function(err, users) {
		if (!err) {
			io.emit('load participants', users);
		}
	});

	socket.on('chat message', function(data) {

		var mArray = data.message.split(" ");

		if (mArray[0] === '/w' && mArray.length > 2 && mArray.shift()) {
			var to = mArray.shift();

			data.message = mArray.join(" ");
			data.type = 'private';

			if(socket.id !== data.wSocketId){
				data.recipient = "[ to: " + to + " ]";
				io.to(socket.id).emit('chat message', data);
			}

			io.to(data.wSocketId).emit('chat message', data);

		} else {
			io.emit('chat message', data);
		}

	});

	socket.on('get user', function(socketId) {
		userMethods.retrieveModel.find({ 'socketId': socketId }, function(err, user) {
			io.to(socket.id).emit('get user', user[0]);
		});
	});

	socket.on('new user', function(msg) {
		let user = {
			name: msg,
			socketId: socket.id
		};

		userMethods.registerUser(user);
		io.emit('new user', user);

	});

	socket.on('disconnect', function() {
		console.log('user disconnected');
		userMethods.removeUser(socket.id);
		io.emit('exit chat', socket.id);
	});
});


app.set('port', (process.env.PORT || 3000));

//SERVER START
http.listen(app.get('port'), function() {
	console.log('listening on port: ' + app.get('port'));
});
