//import packages
const express = require('express');
const mongoose = require('mongoose');
const passport = require('passport');
const cors = require('cors');
const exphbs = require('express-handlebars');
const bodyParser = require('body-parser');
const path = require('path');
const keys = require('./config/keys')



//setup express app
const app = express();
// app.use(bodyParser);
app.use(bodyParser.urlencoded({ extended: false }));


mongoose
    .connect(keys.MONGO_URI, { useNewUrlParser: true })
    .then(() => console.log("Connected to the mongoose"))
    .catch(err => console.log(err));


//import from routes
const greet = require('./routes/greet');
const login = require('./routes/login');
const signup = require('./routes/signup');
const dashboard = require('./routes/dashboard')

//setup view engine
app.set('views', path.join(__dirname, 'views'));
app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

//declare routes 
app.use('/', greet);
app.use('/login', login);
app.use('/signup', signup);
app.use('/dashboard', dashboard);

//listen to app
var port = process.env.PORT || 3000
app.listen(port, ()=>{
    console.log('Server started on port '+ port)
});