var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var path = require('path');


//CONFIGURATIONS
app.use(express.static(path.join(__dirname, 'public')));

//ROUTES
app.get('*', function(req, res) {
	res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

//IO CONNECTIONS
io.on('connection', function(socket) {
	console.log('a user connected');

	 socket.on('chat message', function(msg){
	    console.log('message received: ' + msg);
	    io.emit('chat message', msg);
	  });

	socket.on('disconnect', function() {
		console.log('user disconnected');
	});
});

//SERVER START
http.listen(3000, function() {
	console.log('listening on *:3000');
});