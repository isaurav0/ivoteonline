const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const expressHandlebars = require('express-handlebars');
const expressValidator = require('express-validator');
const connectFlash = require('connect-flash');
const expressSession = require('express-session');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const mongoose = require('mongoose');
const chartjs = require('chart.js');
const nodemailer = require('nodemailer');


//database
const db = require('./config/keys').MONGO_URI;
console.log(db)
mongoose.connect(db, { useNewUrlParser: true});
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);


//Init app
const app = express();

//View Engine
app.set('views', path.join(__dirname, 'views'));
app.engine('handlebars', expressHandlebars({
	defaultLayout:'layout', 
	helpers: {
		count: function(n, block) {
				var accum = '';
				for(var i = 0; i < n; ++i)
					accum += block.fn(i);
				return accum;
			}
		}
	}
));
app.set('view engine', 'handlebars');

//Body parser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));
app.use(cookieParser());

//setup cookies parser
// app.use(cookieParser)

//Set statuc folder
app.use(express.static(path.join(__dirname, 'public')));

//Express Session
app.use(expressSession({
	secret: 'secret',
	saveUninitialized: true,
	resave:true
}));


//Passport Init
app.use(passport.initialize());
app.use(passport.session());

// Express validator
app.use(expressValidator());



//Connect flash
app.use(connectFlash());

//handlebars helper
// Handlebars.registerHelper('times', function(n, block) {
//     var accum = '';
//     for(var i = 0; i < n; ++i)
//         accum += block.fn(i);
//     return accum;
// });

//Global vars
app.use(function (req, res, next) {
	res.locals.success_msg = req.flash('success_msg');
	res.locals.error_msg = req.flash('error_msg');
	res.locals.error = req.flash('error');
	res.locals.user = req.user || null;
	res.locals.host = 'http://localhost:'+app.get('port');
	next();
});

app.use('/', require('./routes/index'));
app.use('/users', require('./routes/users'));
app.use('/poll', require('./routes/polls'));
app.use('/greet', require('./routes/greet'));
app.use('/create', require('./routes/create'));
app.use('/mypolls', require('./routes/mypolls'));
app.use('/aboutme', require('./routes/aboutme'));
app.use('/elections', require('./routes/elections'));
app.use('/createelection', require('./routes/createelection'));
app.use('/createpoll', require('./routes/createpoll'));



//setup favicon
var favicon = require('serve-favicon');
app.use(favicon(__dirname + '/public/images/favicon.ico'));


//Set Port
app.set('port',3000);

mongoose.connection.on('error', function(err) {
    console.log('Mongodb is not running.');
    process.exit();
}).on('connected', function() {
    app.listen(app.get('port'), function() {
        console.log('Server started at : http://localhost:' + app.get('port'));
    });
});