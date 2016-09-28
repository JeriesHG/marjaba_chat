module.exports = function(io) {

	let UserHelper = require('../helpers/UserHelper');
	let userHelper = new UserHelper();

	io.on('connection', function(socket) {
		console.log('a user connected');

		userHelper.retrieveModel.find(function(err, users) {
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

				if (socket.id !== data.wSocketId) {
					data.recipient = "[ to: " + to + " ]";
					io.to(socket.id).emit('chat message', data);
				}

				io.to(data.wSocketId).emit('chat message', data);

			} else {
				io.emit('chat message', data);
			}

		});

		socket.on('get user', function(socketId) {
			userHelper.retrieveModel.find({
				'socketId': socketId
			}, function(err, user) {
				io.to(socket.id).emit('get user', user[0]);
			});
		});

		socket.on('new user', function(msg) {
			let user = {
				name: msg,
				socketId: socket.id
			};

			userHelper.registerUser(user);
			io.emit('new user', user);

		});

		socket.on('disconnect', function() {
			console.log('user disconnected');
			userHelper.removeUserBySocketId(socket.id);
			io.emit('exit chat', socket.id);
		});
	});
}