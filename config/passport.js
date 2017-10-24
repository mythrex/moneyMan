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
	console.log('**FacebookStrategy**');
	OAUTH.findOrCreate({
		where: {
			network_id: profile.id
		},
		defaults: {
			network: profile.provider,
			name: profile.displayName,
			email: profile.emails[0].value
		}
	}).then((userArr)=>{
		done(null,userArr[0]);
	}).catch((err)=>{
		done(err);
	});
});

passport.use('facebook',FacebookStrategy);

module.exports = passport;