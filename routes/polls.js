var express = require('express');
var router = express.Router();
var Candidate = require('../models/candidate');
var Poll = require('../models/poll');
var ObjectId = require('mongoose').Types.ObjectId;


router.get('/:id', ensureAuthenticated, function (req, res) {
    Poll.findById(req.params.id)
        .then(poll => {
            Candidate.find({ parentPoll: poll._id }, (err, candidates) => {
                if (err) console.log(err);
                res.render('polls.handlebars', { poll, candidates });
            })
        }
        )
        .catch(err => console.log(err))
});

router.post('/:pollid/:candid', ensureAuthenticated, (req, res) => {
    // res.redirect('/poll/:'+req.params.id)
    // ObjectId.fromString( req.params.id )
    
    userId = new ObjectId(req.cookies['userData']._id);
    console.log(userId)
    pollId = new ObjectId(req.params.pollid);
    candidateId = new ObjectId(req.params.candid);
    console.log(pollId);
    Candidate.find({ parentPoll: pollId })
        .then(candidate => {
            voted=false;
            var message = null;
            for (i in candidate) {
                console.log(candidate[i]);
                if (candidate[i].votedBy.includes(userId)) {
                    message = 'You cant vote';
                    console.log('radi ka baan');
                    voted = true;
                    // res.redirect('/' + pollId);
                }
            }
            if(!voted){
                console.log('not voted')
                Candidate.findOne({'_id': candidateId})
                .then(cand => {
                    var name = cand.name;
                    console.log(cand.name)
                    message='You voted '+cand.name;
                    console.log(message);
                    res.send(message);
                    
                })
                .catch(err => { console.log(err); })
            }
            // res.send(message);
            // console.log(message)
            
            
            // console.log(candidate.votedBy);
            // console.log(userId);

            // if(!voted){
                // Candidate.findOneAndUpdate({ _id: candidateId }, { $push:{'votedBy': userId }}, () => { console.log('recorded') });
            //     message = 'Your vote has been recorded! ';
            // }
            // console.log(message);
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