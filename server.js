//Modules
var express = require('express');
var app = express();
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var path = require('path');

//Mongoose configuration
var db = require('./config/db');

//connection to db
mongoose.connect(db.url);
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
	console.log('Connected to mongodb..');
});

var port = process.env.PORT || 3000; // set our port
// mongoose.connect(db.url); // connect to our mongoDB database (commented out after you enter in your own credentials)

// get all data/stuff of the body (POST) parameters
app.use(bodyParser.json()); // parse application/json 
app.use(bodyParser.json({
	type: 'application/vnd.api+json'
})); // parse application/vnd.api+json as json
app.use(bodyParser.urlencoded({
	extended: true
})); // parse application/x-www-form-urlencoded

app.use(express.static(path.join(__dirname, 'public'))); // set the static files location /public/img will be /img for users

// routes ==================================================
require('./app/routes')(app); // pass our application into our routes

// start app ===============================================
app.listen(port);
console.log('Magic happens on port ' + port); // shoutout to the user
exports = module.exports = app; // expose app