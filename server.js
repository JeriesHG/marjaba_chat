var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var path = require('path');
var mongoose = require('mongoose');

//mongoose
mongoose.connect('mongodb://localhost/chat');

//Get Save Methods
var UserMethods = require('./app/UserMethods'); 
var userMethods = new UserMethods();

//CONFIGURATIONS
app.use(express.static(path.join(__dirname, 'public')));

//ROUTES
app.get('*', function(req, res) {
	res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

//IO CONNECTIONS
io.on('connection', function(socket) {
	console.log('a user connected');
	// console.log(Object.keys(io.sockets.sockets));
	userMethods.retrieveModel.find(function(err, users){
		if(!err){
			io.emit('load participants', users);
		}
	});

	 socket.on('chat message', function(msg){
	    console.log('message received: ' + msg);
	    io.emit('chat message', msg);
	  });

	  socket.on('new user', function(msg){
	  	let user = {
	  		name : msg,
	  		socketId : socket.id
	  	};

	  	userMethods.registerUser(user);
	    io.emit('new user', msg);
	    
	  });

	socket.on('disconnect', function() {
		console.log('user disconnected');
		userMethods.removeUser(socket.id);
	});
});



//SERVER START
http.listen(3000, function() {
	console.log('listening on *:3000');
});