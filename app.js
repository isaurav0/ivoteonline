//import packages
const express = require('express');
const mongoose = require('mongoose');
const passport = require('passport');
const cors = require('cors');
const exphbs = require('express-handlebars');
const bodyParser = require('body-parser');
const path = require('path');


//setup express app
const app = express();


//connection to database
mongoose.connect('mongodb://localhost/vote', { useNewUrlParser: true });
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', ()=> {
  console.log("Connected to database ");
});


//import from routes
const greet = require('./routes/greet');
const login = require('./routes/login');
const signup = require('./routes/signup');

//setup view engine
app.set('views', path.join(__dirname, 'views'));
app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

//declare routes 
app.use('/', greet);
app.use('/login', login);
app.use('/signup', signup);

//listen to app
var port = process.env.PORT | 3000
app.listen(port, ()=>{
    console.log('Server started on port '+ port)
});