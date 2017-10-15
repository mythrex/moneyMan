const express = require('express');
const router = express.Router();
const EXPENSES = require('../models/expense.js');
const CATEGORIES = require('../models/categories.js');
const Op = require('sequelize').Op;

//for api testing for producstion replace it with req.user.network_id
const userId = "1585338691532903";

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
	return q;
}

router.get('/u/expenses',(req,res)=>{
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
});

router.post('/u/expenses',(req,res)=>{
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
});

router.put('/u/expenses/:id',(req,res)=>{
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
			id: req.params.id
		}
	}).then((result)=>{
		// console.log('***result***',result);
		res.status(200).send({success: true});
	}).catch((err)=>{
		throw err;
	})
});

router.delete('/u/expenses/:id',(req,res)=>{
	EXPENSES.destroy({
		where: {
			id: req.params.id
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
});

module.exports = router;