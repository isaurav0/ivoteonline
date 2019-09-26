var express = require('express');
var router = express.Router();
var Poll = require('../models/poll');
var Candidate = require('../models/candidate');
var Panel = require('../models/panel.js');


router.get('/' ,ensureAuthenticated,function (req, res) {
    res.render('createelection', {title: 'Create Election'});
    // console.log(user);
});

router.post('/',ensureAuthenticated, (req, res)=>{
    var p_number = req.body.number;
    console.log(p_number);
    res.render('electionform', {title: "Election Form", p_number});
});

router.post('/final', ensureAuthenticated,(req, res)=>{
    var title = req.body.title;
    var body = req.body.body;
    var authorID = req.cookies['userData']._id;
    var election = true;
    var total_panel = req.body.count;
    var voterList = req.body.voters;
    var expireAt = Date.parse(req.body.expiry_date);
    var startAt = Date.parse(req.body.start_date);
    // res.send(total_panel)
    // // expireAt = new Date(req.body.expiry_date);
    

    // //save poll
    var newPoll = new Poll({title, body, authorID, election, expireAt, startAt});
    
    for(i in voterList){
        newPoll.voterList.push(voterList[i]);
    }
    newPoll
        .save()
        .then(()=>{console.log("created new Poll")})
        .catch(err=>res.redirect('/createelection'));

    for(i=0;i<total_panel; i++){
        var p_name = req.body["p_name"+i];
        var newPanel = new Panel({name: p_name, parentPoll: newPoll._id});
        newPanel
            .save()
            .then(()=>{console.log("New Panel created")})
            .catch(err=>res.redirect('/createelection'));

        var candidates = req.body["candidates"+i];
        for(j in candidates){
            var newCandidate = new Candidate({name: candidates[j], parentPoll: newPoll._id, parentPanel: newPanel._id})
            newCandidate
                .save()
                .then(()=>console.log("Candidate ",j," saved."))
                .catch(err=>res.redirect('/createelection'))
        }
    } 
    res.redirect('/elections');
});
    // console.log(newPoll._id)
    // candidatesName.forEach(element => {
    //     if(element!=null){
            
    //         var newCandidate = new Candidate({name: element, parentPoll: newPoll._id})
    //         newCandidate
    //             .save()
    //             .then(()=>{
    //                 console.log('candidate saved');
    //                 res.redirect('/');
    //             })
    //             .catch(err=>console.log(err))
    //     }
    // });


function ensureAuthenticated(req, res, next) {
    if(req.isAuthenticated()){
        return next();
    }else{
        // req.flash('error_msg', 'You are not logged in');
        res.redirect('/greet');
    }
}

module.exports = router;
