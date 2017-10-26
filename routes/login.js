const express = require('express');
const router = express.Router();
const passport = require('../config/passport.js');

function isLoggedIn (req, res, next) {
  if (req.isAuthenticated()) { 
  	  console.log('*****LoggedIn*****');
      return next();
  }
  console.log('*****NotLoggedIn*****');
  req.flash('danger', 'Please Login First!')
  res.redirect('/signin');
}

router.get('/',(req,res)=>{
	console.log('***/Signin***');
	console.log(req.flash('danger'));
	res.render('signin',{
		message: req.flash('danger'),
	})
});

router.get('/dashboard',isLoggedIn,(req,res)=>{
	console.log('***/dashboard***');
	res.render('reports',{
		layout: 'dashboard.hbs',
		reportsPage: true,
		profileImageUrl: `http://graph.facebook.com/${req.user.network_id}/picture?type=large`
	})
});

// router.get('/dashboard/categoryWiseReports',(req,res)=>{
// 	res.render('categoryWiseReports',{
// 		layout: 'dashboard.hbs',
// 		weeklyReportsPage: true
// 	})
// });

router.get('/auth/facebook',passport.authenticate('facebook',{scope: 'email'}));

router.get('/auth/facebook/callback',passport.authenticate('facebook',{
	successRedirect: '/dashboard',
	failureRedirect: '/'
}));


module.exports = router;