'use strict';
module.exports = {
	up: async (queryInterface, Sequelize) => {
		await queryInterface.createTable('user_game_biodata', {
			id: {
				allowNull: false,
				autoIncrement: true,
				primaryKey: true,
				type: Sequelize.INTEGER
			},
			id_user_game: {
				type: Sequelize.INTEGER
			},
			nama: {
				type: Sequelize.STRING
			},
			tanggal_lahir: {
				type: Sequelize.DATE
			},
			notelp: {
				type: Sequelize.STRING
			},
			alamat: {
				type: Sequelize.TEXT
			},
			createdAt: {
				allowNull: false,
				type: Sequelize.DATE
			},
			updatedAt: {
				allowNull: false,
				type: Sequelize.DATE
			}
		});
	},
	down: async (queryInterface, Sequelize) => {
		await queryInterface.dropTable('user_game_biodata');
	}
};
