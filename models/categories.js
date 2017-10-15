const db = require('../config/db.js');
const Sequelize = require('sequelize');
const OAUTH = require('./users.js');

const CATEGORIES = db.define('categories',{
	id: {
		type: Sequelize.INTEGER,
		primaryKey: true,
		autoIncrement: true
	},
	category: {
		type: Sequelize.STRING,
		allowNull: false,
	}
});

OAUTH.hasMany(CATEGORIES);
CATEGORIES.belongsTo(OAUTH);

module.exports = CATEGORIES;