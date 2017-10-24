const EXPENSES = require('../models/expense.js');
const CATEGORIES = require('../models/categories.js');
const Sequelize = require('sequelize');
const dateManupulation = require('./dateManupulation.js');
const Op = Sequelize.Op;

//for api testing for producstion replace it with req.user.network_id
// const userId = "1585338691532903";

//function for query generator
function queryGen(req){
	let q = {
		authenticationNetworkId: req.user.network_id
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

	let expense = req.query.expense;
	if(expense){
		q.expense = expense;
	}

	return q;
}

//function to get expenses by category id,tags,desc,min amount,max amount, date range, specific date
module.exports.getExpense = (req,res)=>{
	let q = queryGen(req);

	let order = [['date','DESC']];
	if(req.query.order){
		order = [[req.query.order,'DESC']]
	}
	let limit = 100;
	if(req.query.limit){
		limit = req.query.limit;
	}

	EXPENSES.findAll({
		where: q,
		include: [CATEGORIES],
		order: order,
		limit: limit
	}).then((arr)=>{
		res.status(200).send(arr);
	}).catch((err)=>{
		throw err;
	})
};

//function to get total amount spent
module.exports.getTotalExpense = (req,res)=>{
	let q = queryGen(req);
	let group = 'year';
	EXPENSES.sum('amount',{
		where: q,
	}).then((sum)=>{
		res.send(''+sum);
	}).catch((err)=>{
		throw err;
	})
	
};

//function to get amount spent as per category or get by categoryId
module.exports.getTotalExpensePerCategory = (req,res)=>{
	// console.log('********req.user******',req.user);
	let q = {
		authenticationNetworkId: req.user.network_id,
		expense: true,
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
	let year = date.getFullYear();
	EXPENSES.findAll({
		attributes: [[Sequelize.fn('sum',Sequelize.col('amount')),'sum'],[Sequelize.fn('date_part', 'month', Sequelize.col('date')),'month'],[Sequelize.fn('date_part', 'year', Sequelize.col('date')),'year']],
  		group: [Sequelize.fn('date_part', 'month', Sequelize.col('date')),Sequelize.fn('date_part', 'year', Sequelize.col('date'))],
  		where: {
  			authenticationNetworkId: req.user.network_id,
  			expense: true,
  			// where: Sequelize.where(Sequelize.fn('date_part', 'year', Sequelize.col('date')),{[Op.eq] : year})
  		},
  		order: [[Sequelize.col('year'),'DESC'],[Sequelize.col('month'),'DESC']]
	}).then((result)=>{
		res.send(result);
	}).catch((err)=>{
		throw err;
	})
};

//function to get total-expense as per day
module.exports.getTotalExpensePerDay = (req,res)=>{
	let maxDate = new Date();
	if(req.query.maxDate){
		maxDate = req.query.maxDate;
	}
	let minDate = new Date(maxDate);
	minDate.setDate(0);
	if(req.query.minDate){
		minDate = req.query.minDate;
	}
	
	EXPENSES.findAll({
		attributes: [[Sequelize.fn('sum',Sequelize.col('amount')),'sum'],[Sequelize.fn('date_part', 'day', Sequelize.col('date')),'day'],[Sequelize.fn('date_part','month',Sequelize.col('date')),'month']],
  		group: [Sequelize.col('day'),Sequelize.col('month')],
  		where: {
  			authenticationNetworkId: req.user.network_id,
  			expense: true,
  			date: {
  				[Op.lte]: maxDate,
  				[Op.gte]: minDate
  			}
  			// where: Sequelize.where(Sequelize.fn('date_part', 'year', Sequelize.col('date')),{[Op.eq] : year})
  		},
  		order: [Sequelize.col('day')]
	}).then((result)=>{
		maxDate.setMonth(maxDate.getMonth() - 1);
		minDate.setDate(0);
			EXPENSES.findAll({
				attributes: [[Sequelize.fn('sum',Sequelize.col('amount')),'sum'],[Sequelize.fn('date_part', 'day', Sequelize.col('date')),'day'],[Sequelize.fn('date_part','month',Sequelize.col('date')),'month']],
		  		group: [Sequelize.col('day'),Sequelize.col('month')],
		  		where: {
		  			authenticationNetworkId: req.user.network_id,
		  			expense: true,
		  			date: {
		  				[Op.lte]: maxDate,
		  				[Op.gte]: minDate
		  			}
		  			// where: Sequelize.where(Sequelize.fn('date_part', 'year', Sequelize.col('date')),{[Op.eq] : year})
		  		},
		  		order: [Sequelize.col('day')]
			}).then((prevRes)=>{
				result.push({prev: prevRes});
				res.send(result);
			}).catch((err)=>{
				throw err;
			})
	}).catch((err)=>{
		throw err;
	})
};

//function to get expense details as per day/month/year with previous day/month/year
/**
	if we supply year = 2017 then result[n-1] will contain previous year data
**/
module.exports.getExpensesByDatePart = (req,res)=>{
	EXPENSES.findAll({
		where: {
			where: Sequelize.where(Sequelize.fn('date_part',req.params.date_part,Sequelize.col('date')),{[Op.eq] : req.params.expense_on}),
			authenticationNetworkId: req.user.network_id
		},
	}).then((result)=>{

		EXPENSES.findAll({
		where: {
			where: Sequelize.where(Sequelize.fn('date_part',req.params.date_part,Sequelize.col('date')),{[Op.eq] : req.params.expense_on - 1}),
			authenticationNetworkId: req.user.network_id
			},
		}).then((prevData)=>{
			result.push({prev: prevData});
			res.send(result)
		}).catch((err)=>{
			throw err;
		})

	}).catch((err)=>{
		throw err;
	})
};

//function to get expensesOfLastSixMonths
module.exports.getTotalExpenseLastSixMonths = (req, res)=>{
	let cur_date = new Date();
	let prev_six_month_date = dateManupulation.addMonth(cur_date, -5);
	EXPENSES.findAll({
		attributes: [[Sequelize.fn('sum',Sequelize.col('amount')),'sum'],[Sequelize.fn('date_part', 'month', Sequelize.col('date')),'month'],[Sequelize.fn('date_part', 'year', Sequelize.col('date')),'year']],
		where: {
			date: {
				[Op.lte] : cur_date,
				[Op.gte] : prev_six_month_date
			},
			authenticationNetworkId: req.user.network_id,
			expense: true
		},
		order: [[Sequelize.col('year'),'DESC'],[Sequelize.col('month'),'DESC']],
		group: [Sequelize.fn('date_part', 'month', Sequelize.col('date')),Sequelize.fn('date_part', 'year', Sequelize.col('date'))],
	}).then((result)=>{
		res.send(result);
	}).catch((err)=>{
		throw err;
	});
};

//function to get total spend of this week
module.exports.getTotalExpenseThisWeek = (req, res)=>{
	var cur_date;
	if(req.query.date){
		cur_date = new Date(req.query.date);
		console.log('req.query.date',new Date(req.query.date));
	}else{
		cur_date = new Date();
	}
	var sun_date = dateManupulation.addDay(cur_date, -cur_date.getDay());
	var prev_sun_date = dateManupulation.addDay(sun_date, -7);
	EXPENSES.sum('amount',{
		where: {
			expense: true,
			authenticationNetworkId: req.user.network_id,
			date: {
				[Op.gte] : sun_date,
				[Op.lte] : cur_date
			}
		}
	}).then((sum)=>{
		EXPENSES.sum('amount',{
			where: {
				expense: true,
				authenticationNetworkId: req.user.network_id,
				date: {
					[Op.gte] : prev_sun_date,
					[Op.lt] : sun_date
				}
			}
		}).then((prevSum)=>{
			console.log(sum,prevSum);
			if(prevSum){
				if(sum){
					res.send([{sum: sum},{prevSum: prevSum}]);
				}
				else{
					res.send([{sum: 0},{prevSum: prevSum}]);
				}
			}
			else{
				if(sum){
					res.send([{sum: sum},{prevSum: 0}]);
				}
				else{
					res.send([{sum: 0},{prevSum: 0}]);
				}
			}
		}).catch((err)=>{
			throw err;
		})
	}).catch((err)=>{
		throw err;
	})
};

module.exports.getTotalExpenseWeekdays = (req, res)=>{
	var cur_date;
	if(req.query.date){
		cur_date = new Date(req.query.date);
		console.log('req.query.date',new Date(req.query.date));
	}else{
		cur_date = new Date();
	}
	var sun_date = dateManupulation.addDay(cur_date, -cur_date.getDay());
	EXPENSES.findAll({
		attributes: [[Sequelize.fn('sum',Sequelize.col('amount')),'sum'],'date'],
		where: {
			date: {
				[Op.gte] : sun_date,
				[Op.lte] : cur_date,
			},
			authenticationNetworkId: req.user.network_id,
			expense: true,
		},
		group: ['date'],
		order: ['date']
	}).then((result)=>{
		res.send(result)
	}).catch((err)=>{
		throw err;
	})
};

//create an expense
module.exports.createExpense = (req,res)=>{
	let date = new Date(req.query.date);
	let amount = +req.query.amount;
	let expense;
	console.log(req.query.date,date);
	if (req.query.expense == 'on'||'on ' && req.query.expense != undefined) {
		expense = true;
	}else{
		expense = false;
	}
	CATEGORIES.find({
		where: {
			category: req.query.category
		}
	}).then((categoryObj)=>{
		EXPENSES.create({
			name: req.query.name,
			desc: req.query.desc,
			amount: amount,
			categoryId: categoryObj.id,
			expense: expense,
			date: date,
			authenticationNetworkId: req.user.network_id,
		}).then((result)=>{
			res.status(200).send({success: true});
		}).catch((err)=>{
			throw err;
		})
	}).catch((err)=>{
		throw err;
	})
};

//update the expense
module.exports.updateExpense = (req,res)=>{
	let date = new Date(req.query.date);
	let amount = +req.query.amount;
	let expense;
	if (req.query.expense == 'on'||'on ' && req.query.expense != undefined) {
		expense = true;
	}else{
		expense = false;
	}
	console.log(expense,req.query.expense);
	CATEGORIES.find({
		where: {
			category: req.query.category
		}
	}).then((categoryObj)=>{
		EXPENSES.update({
			name: req.query.name,
			desc: req.query.desc,
			amount: amount,
			categoryId: categoryObj.id,
			expense: expense,
			date: date,
		},{
			where: {
				id: req.params.id,
				authenticationNetworkId: req.user.network_id,
			}
		}).then((result)=>{
			// console.log('***result***',result);
			res.status(200).send({success: true});
		}).catch((err)=>{
			throw err;
		});
	}).catch((err)=>{
		throw err;
	})
	
};

//delete an expense by Id
module.exports.deleteExpense = (req,res)=>{
	EXPENSES.destroy({
		where: {
			id: req.params.id,
			authenticationNetworkId: req.user.network_id,
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