module.exports = function(app) {

	// server routes ===========================================================
	// handle things like api calls
	// authentication routes

	//tomando el modelo
	var User = require('../../app/models/User');

	//muestra todas las Users
	app.get('/api/users', function(req, res) {
		User.find(function(err, Users) {
			if (err)
				res.status(500).send('Error en la base de datos');
			else
				res.status(200).json(Users);
		});
	});

	//muestra un User
	app.get('/api/users/:id', function(req, res) {
		User.findById(req.params.id, function(err, User) {
			if (err)
				res.status(500).send('Error en la base de datos');
			else {
				if (User != null)
					res.status(200).json(User);
				else
					res.status(404).send('No se encontro esa User');
			}
		});
	});

	//agrega una User
	app.post('/api/users', function(req, res) {

		var newUser = new User({
			nombre: req.body.name,
		});

		newUser.save(function(error, User1) {
			if (error) {
				res.status(500).send('No se ha podido agregar.');
			} else {
				res.status(200).json({
					_id: User1._id
				}); //envía al cliente el id generado
			}
		});
	});


	// frontend routes =========================================================
	// route to handle all angular requests
	var path = require('path');

	app.get('*', function(req, res) {
		res.sendFile(path.join(__dirname, '..', 'public', 'index.html'));
	});

};