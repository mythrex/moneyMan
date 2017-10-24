const CATEGORIES = require('../models/categories.js');
const Op = require('sequelize').Op;

//for api testing replace it with req.user.network_id
// const userId = "1585338691532903";

//for getting a categories
module.exports.getCategories = (req,res)=>{
	console.log(req.user.id);
	CATEGORIES.findAll({
		order: ['id'],
		where: {
			 [Op.or]: [{authenticationNetworkId: null},{authenticationNetworkId: req.user.network_id}]
		}
	}).then((categoryArr)=>{
		res.status(200).send(categoryArr);
	}).catch((err)=>{
		throw err;
	})
};

//for creating categories
module.exports.createCategory = (req,res)=>{
	CATEGORIES.create({
		category: req.body.category,
		authenticationNetworkId: req.user.network_id	
	}).then((result)=>{
		res.status(200).send(result);
	}).catch((err)=>{
		throw err;
	})
};

//for updating Category by id
module.exports.updateCategory = (req,res)=>{
	CATEGORIES.update({
		category: req.body.category,
	},{
		where: {
			id: req.params.id,
			authenticationNetworkId: req.user.network_id,
		}
	}).then((result)=>{
		res.status(200).send(result);
	}).catch((err)=>{
		throw err;
	})
};

//for deleting category
module.exports.deleteCategory = (req,res)=>{
	CATEGORIES.destroy({
		where: {
			id: req.params.id,
			authenticationNetworkId: req.user.network_id,
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
};