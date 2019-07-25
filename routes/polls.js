var express = require('express');
var router = express.Router();
var Candidate = require('../models/candidate');
var Poll = require('../models/poll');

router.get('/:id', ensureAuthenticated, function (req, res) {
    Poll.findById(req.params.id)
        .then(poll => {
            Candidate.find({ parentPoll: poll._id }, (err, candidates) => {
                if (err) console.log(err);
                res.render('polls.handlebars',{poll, candidates});
            })
        }
        )
        .catch(err => console.log(err))
})

function ensureAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    } else {
        // req.flash('error_msg', 'You are not logged in');
        res.redirect('/users/login');
    }
}
module.exports = router;