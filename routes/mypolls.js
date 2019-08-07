var express = require('express');
var router = express.Router();
var Candidate = require('../models/candidate');
var Poll = require('../models/poll');
var User = require('../models/user');

//Get Homepage
router.get('/', ensureAuthenticated, function (req, res) {
    // res.cookie('userData',req.user);
    titles=[]
    Poll.find({authorID: req.user._id})
        .then(data=>{
            // console.log(data)
            if(data.length==0)
                res.render('nopolls');                        
            else
                res.render('index',{data, title:'My Polls'});
                
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