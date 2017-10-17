const Sequelize = require('sequelize');
const EXPENSES = require('./models/expense.js');
const wallnut = require('./wallnut.js');

//for api testing replace it with req.user.network_id
const userId = "1585338691532903";

for(var expense of wallnut){
	var date = expense.date.split('-');
	date = new Date('20'+date[2]+'-'+date[1]+'-'+date[0])
	EXPENSES.create({
		name: expense.description,
		desc: "",
		amount: parseInt(expense.amount),
		categoryId: expense.categoryId,
		date: date,
		expense: expense.expense,
		tags: expense.tags,
		authenticationNetworkId: userId,
	});
}