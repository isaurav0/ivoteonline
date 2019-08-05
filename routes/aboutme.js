var express = require('express');
var router = express.Router();

//Get Homepage
router.get('/', ensureAuthenticated, function (req, res) {
    var user = req.cookies['userData'];
    titles=[]
    
    res.render("aboutme",{user})

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