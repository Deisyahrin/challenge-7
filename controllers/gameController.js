// controllers/authController.js
const { user_game, master_room, user_in_room, user_game_history } = require('../models');
const passport = require('../lib/passport');

module.exports = {
	createRoom: async (req, res, next) => {
		await master_room
			.roomFight(req.body)
			.then((result) => {
				const room_name = result.kode_unik;
				res.render('game/game-fight', { room_name, id_player_1 });
			})
			.catch((err) => next(err));
	},
	roomFight: async (req, res, next) => {
		await master_room
			.update(
				{
					id_player_2: req.body.id_player_2
				},
				{
					where: {
						kode_unik: req.body.kode_room
					}
				}
			)
			.then(async (result) => {
				await master_room
					.findOne({
						where: {
							kode_unik: req.body.kode_room
						}
					})
					.then((result) => {
						console.log(result);
						console.log(req.user);
						const player1 = result.id_player_1;
						const player2 = result.id_player_2;
						const idRoom = result.id;
						if (result.kode_unik === req.body.kode_room) {
							res.render('game/game-room', { title: 'Game Room', player1, player2, idRoom });
						} else {
							(err) => {
								next(err);
							};
						}
					});
			})
			.catch((err) => {
				next(err);
			});
	},
	pilihanUser1: async (req, res) => {
		user_in_room
			.create({
				room_id: req.body.room_id,
				pilihan_tangan: req.body.pilihan_tangan
			})
			.then((result) => {
				res.json({ message: 'berhasil' });
			})
			.catch((err) => {
				res.json({ message: 'gagal' });
			});
	},
	pilihanUser2: async (req, res) => {

		await user_in_room.create({
			room_id: req.body.room_id,
			pilihan_tangan: req.body.pilihan_tangan
		});


		const jumlahRonde = await user_in_room.findAll({
			where: { room_id: req.body.room_id }
		});
		console.log(jumlahRonde.length)
		// [{
		// 	id,
		// 	room_id,
		// 	pilihan_tangan : 0
		// }]
		// gunting = 0
		// batu = 1
		// kertas = 2
		// jumlah ronde nya udah kelipatan 2
		if (jumlahRonde.length === 2) {
			//player 1 batu
			// player 2 batu
			var pemenang = null;
			if (jumlahRonde[0].pilihan_tangan == jumlahRonde[1].pilihan_tangan) {
				pemenang = 0;
				// penentuan kemenangan
				// input langsung history
				// modelhistory.create -> player 1
				// modelhistory.create -> player 2
				// model.findOne -> cari player di room - 1 - 2
				// id_user_game: DataTypes.INTEGER,
				// room_id: DataTypes.STRING,
				// nilai: DataTypes.INTEGER,
			} else if (jumlahRonde[0].pilihan_tangan == 0 && jumlahRonde[1].pilihan_tangan == 1) {
				pemenang = 2;
			} else if (jumlahRonde[0].pilihan_tangan == 1 && jumlahRonde[1].pilihan_tangan == 2) {
				pemenang = 2;
			} else if (jumlahRonde[0].pilihan_tangan == 2 && jumlahRonde[1].pilihan_tangan == 0) {
				pemenang = 2;
			} else {
				pemenang = 1;
			}
			if (pemenang == 1) {
				user_game_history.create({
					id_user_game: 1,
					room_id: req.body.room_id,
					nilai: 100
				});
				user_game_history.create({
					id_user_game: 6,
					room_id: req.body.room_id,
					nilai: 0
				});
			}
			if (pemenang == 2) {
				user_game_history.create({
					id_user_game: 1,
					room_id: req.body.room_id,
					nilai: 0
				});
				user_game_history.create({
					id_user_game: 6,
					room_id: req.body.room_id,
					nilai: 100
				});
			}
			if (pemenang == 0) {
				user_game_history.create({
					id_user_game: 1,
					room_id: req.body.room_id,
					nilai: 0
				});
				user_game_history.create({
					id_user_game: 6,
					room_id: req.body.room_id,
					nilai: 0
				});
			}
		}
	}
};
