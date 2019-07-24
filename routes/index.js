var express = require('express');
var router = express.Router();
var user = require('./users')

//Get Homepage
router.get('/', ensureAuthenticated, function (req, res) {
    res.cookie('userData',req.user);
    res.render('index');
});

function ensureAuthenticated(req, res, next) {
    if(req.isAuthenticated()){
        return next();
    }else{
        // req.flash('error_msg', 'You are not logged in');
        res.redirect('/greet');
    }
}
module.exports = router;