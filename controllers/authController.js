// controllers/authController.js
const { user_game, user_game_biodata } = require('../models');
const passport = require('../lib/passport');

module.exports = {
	register: (req, res, next) => {
		// Kita panggil static method register yang sudah kita buat tadi
		user_game
			.register(req.body)
			.then((result) => {
				user_game_biodata.create({
					id_user_game: result.id
				});
				res.redirect('/login');
			})
			.catch((err) => next(err));
	},
	// Kalau mau tulis di file controllers/authController.js
	// Letakkan kode ini setelah bagian register
	login: passport.authenticate('local', {
		successRedirect: '/game',
		failureRedirect: '/login',
		failureFlash: true // Untuk mengaktifkan express flash
	})
};
