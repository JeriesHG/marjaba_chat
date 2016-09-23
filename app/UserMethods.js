'use strict'
module.exports = class UserMethods {

	constructor() {
		this.User = require('./models/User.js');
	}

	registerUser(msg) {
		var user = new this.User({
			name: msg.name,
			socketId: msg.socketId,
			created : msg.date,
			active: true
		});

		user.save(function(error, savedUser) {
			if (error) {
				console.log(error);
			} else {
				console.log('Registered New User');
			}
		});
	}

	removeUser(socketId) {
		this.User.find(function(error, users) {
			for (var i = 0; i < users.length; i++) {
				if (users[i].socketId === socketId) {
					var deleteUser = users[i];
					deleteUser.remove(function(error, result) {
						if (error)
							console.log(error);
						else
							console.log("Erased User");
					});
					break;
				}
			}
		});
	}

	get retrieveModel() {
		return this.User;
	}
}