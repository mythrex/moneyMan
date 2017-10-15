const express = require('express');
const router = express.Router();
const passport = require('../config/passport.js');

function isLoggedIn(req,res,next) {
	if(req.isAuthenticated()){
		console.log('Logged In');
		next();
	}
	else{
		console.log('Not logged In');
		res.redirect('/signin');
	}
}

router.get('/signIn',(req,res)=>{
	res.render('signin')
});

router.get('/auth/facebook',passport.authenticate('facebook',{scope: 'email'}));

router.get('/auth/facebook/callback',passport.authenticate('facebook',{
	successRedirect: '/private',
	failureRedirect: '/signIn'
}));

router.get('/private',isLoggedIn,(req,res)=>{
	res.send('Authenticated!<a href="/logouts">logout</a>');
});



module.exports = router;