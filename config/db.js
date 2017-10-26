const dotenv = require('dotenv').load();
const Sequelize = require('sequelize');
//connect to db

//TODO setup-the project and db
// const db = new Sequelize(process.env.DB_DB,process.env.DB_USER,process.env.DB_PASS,{
//   dialect: process.env.DB_DIALECT,
//   host: process.env.DB_HOST,
//   operatorsAliases: false
// });
const db = new Sequelize(process.env.DB_URL,{
  // dialect: 'postgres',
  operatorsAliases: false
});

db.sync().then(()=>{
	console.log('DB Connected');
}).catch((err)=>{
	throw err;
});

module.exports = db;
