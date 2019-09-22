var express = require('express');
var router = express.Router();
var Poll = require('../models/poll');
var ObjectId = require('mongoose').Types.ObjectId;
var Candidate = require('../models/candidate');
var Panel = require('../models/panel');
var data = {
        
};


router.get('/', function (req, res) {
    Poll.find({election: true})
        .then(data=>{
            res.render('election',{title:'Elections', data}); 
        })
        .catch(err=>console.log(err));
});

router.get('/:eid', (req, res) => {
    userId = new ObjectId(req.cookies['userData']._id);
    eid = new ObjectId(req.params.eid);
    email = req.cookies['userData'].email;
    var p_ids = [];

    Poll.findById(eid).lean()
        .then(poll => {
            data['poll']=poll
            Panel.find({parentPoll: eid}).lean()
                .then(panels=>{
                    data['poll'].panels = panels;
                    for(i in panels)
                        data['poll'].panels[i].candidates = []

                        Candidate.find({parentPoll: poll._id}).lean()
                            .then(candidates => {
                                for(i in candidates){
                                    for(j in panels){                            
                                        if(JSON.stringify(candidates[i].parentPanel)===JSON.stringify(panels[j]._id)){
                                            console.log(candidates[i].parentPanel, "===", panels[j]._id)
                                            data['poll'].panels[j].candidates.push(candidates[i])
                                        }                                      
                                    }
                                }
                                res.render('electionview', data)
                            })
                            .catch(err=>console.log(err));
                    
                })
                .catch(err=>console.log(err));
                
            })

            // Candidate.find({ parentPoll: poll._id }, (err, candidates) => {
            //     if (err) console.log(err);
            //     var voted = false;
            //     for (i in candidates) {
            //         if (candidates[i].votedBy.includes(userId)) {
            //             console.log('inelligible to vote! ');
            //             voted = true;
            //         }
            //     }
            //     //if voted render result 
            //     if (voted) {
            //         var totalvotes = 0
            //         for (i in candidates) {
            //             candidates[i].votes = candidates[i].votedBy.length
            //             totalvotes += candidates[i].votes
            //         }
            //         for (i in candidates) {
            //             candidates[i].percent = Math.round(candidates[i].votedBy.length / totalvotes * 100 * 100) / 100;
            //         }
                
            //         res.render('result.handlebars', { title: 'Result', poll, candidates, candidatejs: JSON.stringify(candidates) });
            //     }
            //     //if not voted check if elligible
            //     else {
            //             res.render('polls.handlebars', {title: 'Polls' ,poll, candidates });
            //     }           
            // })
        // })
        .catch(err => console.log(err));
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