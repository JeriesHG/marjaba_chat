'use strict'
var mongoose = require('mongoose');

// define our nerd model
// module.exports allows us to pass this to other files when it is called
module.exports = mongoose.model('User', {
	// _id: {
	// 	type: mongoose.Schema.Types.ObjectId,
	// 	required: false
	// },
	name: String,
	socketId: String,
	created : Date,
	active : Boolean
});