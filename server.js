const express = require('express');
const db = require('./db.js');
const exphbs = require('express-hbs');
const app = express();
var port = process.env.PORT || 3000;

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

// app.get('path', (req, res) => {
//
// });

app.listen(port, function () {
  console.log(`Server Starts on ${port}`);
});
