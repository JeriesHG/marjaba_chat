'use strict'
module.exports = class UserHelper {

	constructor() {
		this.User = require('../models/User.js');
	}

	registerUser(msg) {
		var user = new this.User({
			name: msg.name,
			socketId: msg.socketId,
			created: msg.date,
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

	removeUserBySocketId(socketId) {
		this.User.find({
			socketId: socketId
		}, function(error, user) {
			if (!error) {
				user.remove(function(error, result) {
					if (error)
						console.log(error);
					else
						console.log("Erased User");
				});
			}
		});
	}

	removeUserByName(name) {
		this.User.find({
			name: name
		}, function(error, user) {
			if (!error) {
				user.remove(function(error, result) {
					if (error)
						console.log(error);
					else
						console.log("Erased User");
				});
			}
		});
	}

	get retrieveModel() {
		return this.User;
	}
}