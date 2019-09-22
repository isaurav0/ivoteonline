var express = require('express');
var router = express.Router();
var Poll = require('../models/poll');
var Candidate = require('../models/candidate');


router.get('/' ,ensureAuthenticated,function (req, res) {
    res.render('createpoll', {title: 'Create Poll'});
    // console.log(user);
});

router.post('/',ensureAuthenticated,(req, res)=>{
    var title = req.body.title;
    var body = req.body.body;
    var candidatesName = req.body.candidates;
    var public = req.body.optradio;
    var authorID = req.cookies['userData']._id;
    var election = false;
    

    //save poll
    var newPoll = new Poll({title, body, authorID, election});
    newPoll
        .save()
        .then(()=>{console.log("created new Poll")})
        .catch(err=>console.log(err));
    //election
    // else{
    //     var newPoll = new Poll({title, body, public, authorID,election});
    //     for(i in voterList){
    //         newPoll.voterList.push(voterList[i]);
    //     }
    //     newPoll
    //         .save()
    //         .then(()=>{console.log("created new Poll")})
    //         .catch(err=>console.log(err));
    // }


    console.log(newPoll._id)
    candidatesName.forEach(element => {
        if(element!=null){
            
            var newCandidate = new Candidate({name: element, parentPoll: newPoll._id})
            newCandidate
                .save()
                .then(()=>{
                    console.log('candidate saved');
                    res.redirect('/');
                })
                .catch(err=>console.log(err))
        }
    });
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
