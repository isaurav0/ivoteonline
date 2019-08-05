var express = require('express');
var router = express.Router();
var Poll = require('../models/poll');


router.get('/', ensureAuthenticated, function (req, res) {
    Poll.find({election: true})
        .then(data=>{
            res.render('index',{title:'Elections', data}); 
        })
        .catch(err=>console.log(err));
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