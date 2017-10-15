const EXPENSES = require('../models/expense.js');
const CATEGORIES = require('../models/categories.js');
const Sequelize = require('sequelize');
const Op = Sequelize.Op;

//for api testing for producstion replace it with req.user.network_id
const userId = "1585338691532903";

//function for query generator
function queryGen(req){
	let q = {
		authenticationNetworkId: userId
	};
	
	let categId = req.query.categoryId;
	if(categId){
		q.categoryId = categId;
	}

	
	let minAmount = req.query.minAmount;
	if(minAmount){
		if(!q.amount) q.amount = {};
		q.amount[Op.gte] = minAmount;
	}

	let maxAmount = req.query.maxAmount;
	if(maxAmount){
		if(!q.amount) q.amount = {};
		q.amount[Op.lte] = maxAmount;
	}

	let tags = req.query.tags;
	if(tags){
		q.tags = tags
	}

	
	let minDate = req.query.minDate;
	if(minDate){
		if(!q.date) q.date = {};
		q.date[Op.gte] = new Date(minDate);
	}

	let maxDate = req.query.maxDate;
	if(maxDate){
		if(!q.date) q.date = {};
		q.date[Op.lte] = new Date(maxDate);
	}

	let date = req.query.date;
	if(date){
		q.date = date;
	}

	return q;
}

//function to get expenses by category id,tags,desc,min amount,max amount, date range, specific date
module.exports.getExpense = (req,res)=>{
	let q = queryGen(req);
	// console.log(q);
	EXPENSES.findAll({
		where: q,
		include: [CATEGORIES]
	}).then((arr)=>{
		res.status(200).send(arr);
	}).catch((err)=>{
		throw err;
	})
};

//function to get total amount spent
module.exports.getTotalExpense = (req,res)=>{

	EXPENSES.sum('amount',{
		where: {
			authenticationNetworkId: userId,
		}
	}).then((sum)=>{
		res.send(''+sum);
	}).catch((err)=>{
		throw err;
	})
	
};

//function to get amount spent as per category or get by categoryId
module.exports.getTotalExpensePerCategory = (req,res)=>{
	let q = {
		authenticationNetworkId: userId,
	};
	let categoryId = req.query.categoryId;
	if(categoryId){
		q.categoryId = categoryId;
	}
	EXPENSES.findAll({
		where: q,
		group: ['categoryId','category.id'],
		attributes: ['categoryId',[Sequelize.fn('sum',Sequelize.col('amount')),'sum']],
		include: CATEGORIES
	}).then((sum)=>{
		// console.log(sum);
		res.send(sum);
	}).catch((err)=>{
		throw err;
	})
};

//function to get total-expense as per months
module.exports.getTotalExpensePerMonth = (req,res)=>{
	let date = new Date();
	let year = date.getYear() + 1900;
	EXPENSES.findAll({
		attributes: [[Sequelize.fn('sum',Sequelize.col('amount')),'sum'],[Sequelize.fn('date_part', 'month', Sequelize.col('date')),'month']],
  		group: [Sequelize.fn('date_part', 'month', Sequelize.col('date'))],
  		where: {
  			authenticationNetworkId: userId,
  			where: Sequelize.where(Sequelize.fn('date_part', 'year', Sequelize.col('date')),{[Op.eq] : year})
  		},
  		order: Sequelize.col('month')
	}).then((result)=>{
		res.send(result);
	}).catch((err)=>{
		throw err;
	})
};

//function to get expense details as per day/month/year
module.exports.getExpensesByDatePart = (req,res)=>{
	EXPENSES.findAll({
		where: {
			where: Sequelize.where(Sequelize.fn('date_part',req.params.date_part,Sequelize.col('date')),{[Op.eq] : req.params.expense_on}),
			authenticationNetworkId: userId
		}
	}).then((result)=>{
		res.send(result);
	}).catch((err)=>{
		throw err;
	})
};

//create an expense
module.exports.createExpense = (req,res)=>{
	EXPENSES.create({
		name: req.body.name,
		desc: req.body.desc,
		amount: req.body.amount,
		categoryId: req.body.categoryId,
		date: req.body.date,
		expense: req.body.expense,
		tags: req.body.tags,
		authenticationNetworkId: userId,
	}).then((result)=>{
		console.log(result);
		res.status(200).send(result);
	}).catch((err)=>{
		throw err;
	})
};

//update the expense
module.exports.updateExpense = (req,res)=>{
	// console.log('***req.body***',req.body);
	EXPENSES.update({
		name: req.body.name,
		desc: req.body.desc,
		amount: req.body.amount,
		categoryId: req.body.categoryId,
		expense: req.body.expense,
		tags: req.body.tags,
		date: req.body.date,
	},{
		where: {
			id: req.params.id,
			authenticationNetworkId: userId,
		}
	}).then((result)=>{
		// console.log('***result***',result);
		res.status(200).send({success: true});
	}).catch((err)=>{
		throw err;
	})
};

//delete an expense by Id
module.exports.deleteExpense = (req,res)=>{
	EXPENSES.destroy({
		where: {
			id: req.params.id,
			authenticationNetworkId: userId,
		}
	}).then((result)=>{
		if (result) {
			res.status(200).send({success: true});
		}else{
			res.status(404).send({success: false});
		}
	}).catch((err)=>{
		throw err;
	})
};