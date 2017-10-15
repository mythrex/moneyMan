const express = require('express');
const router = express.Router();
const CATEGORIES = require('../models/categories.js');
const Op = require('sequelize').Op;

//for api testing replace it with req.user.network_id
const userId = "1585338691532903";

router.get('/u/category',(req,res)=>{
	CATEGORIES.findAll({
		order: ['id'],
		where: {
			 [Op.or]: [{authenticationNetworkId: null},{authenticationNetworkId: userId}]
		}
	}).then((categoryArr)=>{
		res.status(200).send(categoryArr);
	}).catch((err)=>{
		throw err;
	})
});

router.post('/u/category',(req,res)=>{
	CATEGORIES.create({
		category: req.body.category,
		authenticationNetworkId: userId	
	}).then((result)=>{
		res.status(200).send(result);
	}).catch((err)=>{
		throw err;
	})
});

router.put('/u/category/:id',(req,res)=>{
	CATEGORIES.update({
		category: req.body.category,
	},{
		where: {
			id: req.params.id,
		}
	}).then((result)=>{
		res.status(200).send(result);
	}).catch((err)=>{
		throw err;
	})
});

router.delete('/u/category/:id',(req,res)=>{
	CATEGORIES.destroy({
		where: {
			id: req.params.id,
			authenticationNetworkId: userId,
		}
	}).then((result)=>{
		console.log(result);
		if(result){
			res.send({success: true});
		}else{
			res.send({success: false});
		}
	}).catch((err)=>{
		throw err;
	})
});

module.exports = router;