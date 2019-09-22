var express = require('express');
var router = express.Router();
var Candidate = require('../models/candidate');
var Poll = require('../models/poll');
var ObjectId = require('mongoose').Types.ObjectId;



router.get('/:pollid', ensureAuthenticated, (req, res) => {
    userId = new ObjectId(req.cookies['userData']._id);
    pollId = new ObjectId(req.params.pollid);
    email = req.cookies['userData'].email
    Poll.findById(pollId)
        .then(poll => {
            Candidate.find({ parentPoll: poll._id }, (err, candidates) => {
                if (err) console.log(err);
                var voted = false;
                for (i in candidates) {
                    if (candidates[i].votedBy.includes(userId)) {
                        console.log('inelligible to vote! ');
                        voted = true;
                    }
                }
                //if voted render result 
                if (voted) {
                    var totalvotes = 0
                    for (i in candidates) {
                        candidates[i].votes = candidates[i].votedBy.length
                        totalvotes += candidates[i].votes
                    }
                    for (i in candidates) {
                        candidates[i].percent = Math.round(candidates[i].votedBy.length / totalvotes * 100 * 100) / 100;
                    }
                
                    res.render('result.handlebars', { title: 'Result', poll, candidates, candidatejs: JSON.stringify(candidates) });
                }
                //if not voted check if elligible
                else {
                        res.render('polls.handlebars', {title: 'Polls' ,poll, candidates });
                }           
            })
        })
        .catch(err => console.log(err))
});


router.post('/:pollid/:candid', ensureAuthenticated, (req, res) => {
    userId = new ObjectId(req.cookies['userData']._id);
    pollId = new ObjectId(req.params.pollid);
    candidateId = new ObjectId(req.params.candid);

    Candidate.find({ parentPoll: pollId })
        .then(candidate => {
            var voted = false;
            for (i in candidate) {
                if (candidate[i].votedBy.includes(userId)) {
                    console.log('inelligible to vote! ')
                    voted = true;
                }
            }
            if (!voted) {
                Candidate.findOneAndUpdate({ _id: candidateId }, { $push: { 'votedBy': userId } }, (err, cand) => {
                    message = 'You voted ' + cand.name;
                    console.log(message)
                });
                console.log('vote casted')
            }

            res.redirect('/poll/' + pollId)

        })
        .catch(err => console.log(err));
});


function ensureAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    } else {
        // req.flash('error_msg', 'You are not logged in');
        res.redirect('/users/login');
    }
}
module.exports = router;
