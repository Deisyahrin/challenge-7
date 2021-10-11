const { user_game, master_room } = require('../models');
const passport = require('../lib/passport');
const game = require('../controllers/gameController');

exports.home = (req, res) => {
	const title = 'RPS Game',
		subTitle = 'Rock, Paper, Scissors Game';
	res.render('index', { title, subTitle });
};

exports.register = (req, res) => res.render('users/register', { title: 'Register' });

exports.login = (req, res) => res.render('users/login', { title: 'Login' });

exports.profile = (req, res) => {
	const user = req.user.dataValues;
	res.render('users/profile', { title: 'Login', user });
};

exports.createRoom = (req, res) => {
	const user = req.user.dataValues;
	res.render('game/create-room', { title: 'Create Room', user });
};

exports.gameLobby = (req, res) => {
	const user = req.user.dataValues;
	res.render('game/game-lobby', { title: 'Game Lobby', user });
};

exports.gameRoom = (req, res) => {
	const user = game.roomFight.player1;
	res.render('game/game-room', { title: 'Game Room', user });
};

exports.roomFight = (req, res) => {
	const room_name = game.createRoom.room_name;
	const user = req.user.dataValues;
	res.render('game/game-fight', { title: 'Game Fight', room_name, user });
};

exports.fightPlayer1 = (req, res) => {
	res.render('game/game-room-player-1');
};

exports.fightPlayer2 = (req, res) => {
	res.render('game/game-room-player-2');
};
