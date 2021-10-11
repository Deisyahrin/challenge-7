'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
	class master_room extends Model {
		/**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
		static associate(models) {
			// define association here
		}
		static roomFight = async ({ nama_room, id_player_1, id_player_2 }) => {
			const random_room = Math.floor(Math.random() * 1000);
			const unique_code = random_room + nama_room[0] + nama_room[1] + nama_room[2];
			return await this.create({ nama_room, id_player_1, id_player_2, kode: unique_code });
		};
	}
	master_room.init(
		{
			nama_room: DataTypes.STRING,
			id_player_1: DataTypes.INTEGER,
			id_player_2: DataTypes.INTEGER,
			kode: DataTypes.STRING
		},
		{
			sequelize,
			modelName: 'master_room'
		}
	);
	return master_room;
};
