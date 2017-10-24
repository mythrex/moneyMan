//modules
const express = require('express');
const app = express();
const exphbs = require('express-hbs');
const dotenv = require('dotenv').config();
const bp = require('body-parser');
const cp = require('cookie-parser');
const session = require('express-session');
const pgSession = require('connect-pg-simple')(session);
var flash = require('connect-flash');
//local config files
const db = require('./config/db.js');
const passport = require('./config/passport.js');

//routes
const login = require('./routes/login.js');
const categories = require('./routes/categories.js');
const expense = require('./routes/expense.js');

const port = process.env.PORT;

//body parser
app.use(bp.urlencoded({extended: false}));
app.use(bp.json());
//cookie-parser
app.use(cp(process.env.CP_SECRET));
//express session
app.use(session({
	store: new pgSession({
		conString : 'pg://' + process.env.DB_USER + ':' + process.env.DB_PASS + '@' + process.env.DB_HOST + '/' + process.env.DB_DB,
	}),
	secret: process.env.SESSION_SECRET,
	resave: true,
	saveUninitialized: true,
	cookie: { maxAge: 30 * 24 * 60 * 60 * 1000 } // 30 days
}));

//for flash-messeges
app.use(flash());

//passport
app.use(passport.initialize());
app.use(passport.session());

app.use('/',express.static(__dirname + '/public'));
//setting up hbs engine
app.engine('hbs',exphbs.express4({
  layoutsDir: 'views/layouts',
  partialsDir: 'views/partials',
  defaultLayout: 'views/layouts/main.hbs'
}))
app.set('view engine','hbs');
app.set('views','views');
//TODO Do some stuff here

app.use(login,categories,expense);

app.get('/logouts', function(req, res){
	console.log('**logging out**');
  req.session.destroy(function (err) {
  	console.log('**destroyed session**');
    res.redirect('/signin'); //Inside a callback… bulletproof!
  });
});

app.listen(port, function () {
  console.log(`Server Starts on ${port}`);
});
