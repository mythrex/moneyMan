const passport = require('passport');
const facebookStrategy = require('passport-facebook')
const OAUTH = require('../models/users.js');
const dotenv = require('dotenv').config();

passport.serializeUser((user,done)=>{
	console.log('serializeUser');
	done(null,user.network_id);
})

passport.deserializeUser((id,done)=>{
	console.log('deserializeUser');
	OAUTH.find({
		where: {
			network_id: id
		}
	}).then((user)=>{
		// console.log(user);
		done(null,user);
	}).catch((err)=>{
		done(err);
	})
})

let FacebookStrategy = new facebookStrategy({
	clientID: process.env.FACEBOOK_CLIENT_ID,
	clientSecret: process.env.FACEBOOK_CLIENT_SECRET,
	callbackURL: 'http://localhost:3000/auth/facebook/callback',
	profileFields: ['id', 'displayName', 'email']
},(accessToken, refreshToken, profile, done)=>{
	console.log('**FacebookStrategy**',profile);
	// OAUTH.find({
	// 	where: {
	// 		network_id: profile.id
	// 	}}).then((result)=>{
	// 		if (result != null) {
	// 			done(null,result);
	// 		}else{
	// 			OAUTH.create({
	// 				network: profile.provider,
	// 				name: profile.displayName,
	// 				email: profile.emails[0].value
	// 			}).then((user)=>{
	// 				done(null,user);
	// 			}).catch((err)=>{
	// 				throw err;
	// 			})
	// 		}
	// 	}).catch((err)=>{
	// 		throw err;
	// 	})
	let defaults = {
			network: profile.provider,
			name: profile.displayName
		};
	if(profile.emails){
		defaults.email = profile.emails[0].value;
	}
	OAUTH.findOrCreate({
		where: {
			network_id: profile.id
		},
		defaults: defaults
	}).then((userArr)=>{
		console.log(userArr);
		done(null,userArr[0]);
	}).catch((err)=>{
		done(err);
	});
});

passport.use('facebook',FacebookStrategy);

module.exports = passport;