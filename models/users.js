const db = require('../config/db.js');

const USERS = db.define('table-name',{
	prop1: {
		type: 'type';
	}
})

module.exports = USERS;