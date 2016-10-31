module.exports = function(app) {

	// server routes ===========================================================
	let UserHelper = require('./helpers/UserHelper');
	let userHelper = new UserHelper();
	let path = require('path');

	//TEMP
	app.delete('/api/user/:name', function(req, res) {
		userHelper.removeUserByName(req.params.name);
		res.status(200).send('Eliminado');
	});

	// routes to handle all angular requests
	app.get('*', function(req, res) {
		res.sendFile(path.join(__dirname, '../', 'client', 'views', 'index.html'));
	});
};