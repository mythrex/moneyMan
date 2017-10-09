const Sequelize = require('sequelize');
//connect to db
//TODO setup-the project and db
const db = new Sequelize("db","username","pass",{
  dialect: "dialect",
  host: "localhost"
});




module.exports = db;
