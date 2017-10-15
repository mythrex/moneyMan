const db = require('../config/db.js');
const Sequelize = require('sequelize');

const OAUTH = db.define('authentication',{
	id: {
		type: Sequelize.INTEGER,
		autoIncrement: true,
		allowNull: false,
		unique: true,
	},
	network_id: {
		type: Sequelize.STRING,
		primaryKey: true,
	},
	network: {
		type: Sequelize.STRING,
		allowNull: false,
	},
	name: {
		type: Sequelize.STRING,
		allowNull: false
	},
	email: {
		type: Sequelize.STRING,
	}
});

// const USERS = db.define('users',{
// 	id: {
// 		type: Sequelize.INTEGER,
// 		primaryKey: true,
// 		autoIncrement: true
// 	},
// 	name: {
// 		type: Sequelize.STRING,
// 		allowNull: false
// 	},
// 	email: {
// 		type: Sequelize.STRING,
// 		allowNull: false
// 	},
// 	password: {
// 		type: Sequelize.STRING,
// 		allowNull: false
// 	},
// 	username: {
// 		type: Sequelize.STRING,
// 		allowNull: false,
// 	}
// });

module.exports = OAUTH;