var express = require('express');
var router = express.Router();
var Candidate = require('../models/candidate');
var Poll = require('../models/poll');
var ObjectId = require('mongoose').Types.ObjectId

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

router.post('/:id/:pollid', ensureAuthenticated, (req,res)=>{
    // res.redirect('/poll/:'+req.params.id)
    // ObjectId.fromString( req.params.id )
    userId = new ObjectId(req.cookies['userData']._id);
    pollId = new ObjectId(req.params.pollid);
    candidateId = new ObjectId(req.params.id);
    console.log(pollId);
    Candidate.find({ parentPoll: pollId })
        .then(candidate => {
            console.log(candidate);
            console.log(userId);
            if(candidate[0].votedBy.includes(userId))
            {
                message = 'You cant vote'
            }
            else{
                message = 'Your vote has been recorded! '
            }
            res.render('polls.handlebars',{message} )
        })
        .catch(err=>console.log(err));
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