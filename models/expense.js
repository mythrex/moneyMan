const db = require('../config/db.js');
const Sequelize = require('sequelize');
const USERS = require('./users.js');
const CATEGORIES = require('./categories.js');

const EXPENSES = db.define('expense',{
	id: {
		type: Sequelize.INTEGER,
		primaryKey: true,
		autoIncrement: true,
	},
	name: {
		type: Sequelize.STRING,
		allowNull: false,
	},
	amount: {
		type: Sequelize.INTEGER,
		allowNull: false
	},
	desc: {
		type: Sequelize.STRING,
	},
	date: {
		type: Sequelize.DATEONLY,
		allowNull: false,
	},
	expense: {
		type: Sequelize.BOOLEAN,
	},
	tags: {
		type: Sequelize.STRING,
	}
});

USERS.hasMany(EXPENSES);
EXPENSES.belongsTo(USERS);

CATEGORIES.hasMany(EXPENSES);
EXPENSES.belongsTo(CATEGORIES);


module.exports = EXPENSES;