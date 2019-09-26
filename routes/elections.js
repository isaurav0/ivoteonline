var express = require('express');
var router = express.Router();
var Poll = require('../models/poll');
var ObjectId = require('mongoose').Types.ObjectId;
var Candidate = require('../models/candidate');
var Panel = require('../models/panel');
var data = {
        
};


router.get('/', ensureAuthenticated, function (req, res) {
    Poll.find({election: true})
        .then(data=>{
            res.render('election',{title:'Elections', data}); 
        })
        .catch(err=>console.log(err));
});

router.get('/:eid', ensureAuthenticated,(req, res) => {
    userId = req.cookies['userData']._id
    eid = new ObjectId(req.params.eid);
    email = req.cookies['userData'].email;
    var p_ids = [];

    Poll.findById(eid).lean()
        .then(poll => {
            data['poll']=poll
            if(Date.now()<Date.parse(poll.expireAt) && Date.now()>Date.parse(poll.startAt)){
                data['poll'].running = true;
                data['poll'].status = 'Ongoing';
            }
            else if(Date.now()<Date.parse(poll.startAt)){
                data['poll'].running = false;
                data['poll'].notstarted = true;
                data['poll'].status = 'Not started';
            }
            else{
                data['poll'].running = false;
                data['poll'].status = 'Finished';
                data['poll'].ended = true;                                
            }
            Panel.find({parentPoll: eid}).lean()
                .then(panels=>{
                    data['poll'].panels = panels;
                    data['poll'].elligible = false;
                    for(i in panels){
                        data['poll'].panels[i].candidates = [];
                        data['poll'].panels[i].voted=false;
                        data['poll'].panels[i].totalvotes=0;
                        
                    }                                                
                        Candidate.find({parentPoll: poll._id}).lean()
                            .then(candidates => {
                                for(i in candidates){
                                    candidates[i].percent = 0;
                                }

                                if(poll.voterList.includes(email)){
                                    data['poll'].elligible = true;
                                    for(i in candidates){
                                        for(j in panels){                            
                                            if(JSON.stringify(candidates[i].parentPanel)===JSON.stringify(panels[j]._id)){                                            
                                                data['poll'].panels[j].candidates.push(candidates[i]);
                                                //check if already voted or not
                                                for(k in candidates[i].votedBy){
                                                    if(candidates[i].votedBy[k]==userId)
                                                        data['poll'].panels[j].voted=true;
                                                        var message = 'You have already voted!'   
                                                }                                                                                                                                                                            
                                            }                                      
                                        }                                    
                                    }
                                    
                                    for(i in panels){                                        
                                        if(panels[i].voted){
                                            totalvotes = 0;
                                            for (j in data['poll'].panels[i].candidates) {                                                                               
                                                data['poll'].panels[i].candidates[j].votes = data['poll'].panels[i].candidates[j].votedBy.length;
                                                totalvotes += data['poll'].panels[i].candidates[j].votes;
                    
                                            }
                                            data['poll'].panels[i].totalvotes = totalvotes;
                                            for (j in data['poll'].panels[i].candidates) {                                                                                                                                            
                                                    data['poll'].panels[i].candidates[j].percent = Math.round(data['poll'].panels[i].candidates[j].votes / totalvotes * 100 * 100) / 100;                                                                                                                                                                                                
                                                }                                                   
                                            }                                                                                        
                                        }                                           
                                        // res.send(candidates);
                                        res.render('electionview',{title: 'Election', poll: poll, data: JSON.stringify(candidates) });
                                    }

                                else{
                                    var message='You are not included in this election';
                                    res.render('restricted',data);
                                }                                                                                                                                                                                            
                            })
                            .catch(err=>console.log(err));
                    
                })
                .catch(err=>console.log(err));
                
            })    
        .catch(err => console.log(err));
});


router.post('/:pid/:cid', ensureAuthenticated,(req, res)=>{
    userId = req.cookies['userData']._id
    pid = new ObjectId(req.params.pid);
    cid = new ObjectId(req.params.cid);
    email = req.cookies['userData'].email;
    Panel.findById(pid)
        .then(panel=>{
            pollid = panel.parentPoll;
            Candidate.find({parentPanel: panel._id})
                .then(candidates=>{
                    var voted = false;
                    for(i in candidates){
                        for(j in candidates[i].votedBy){
                            if(candidates[i].votedBy[j]==userId){
                                voted=true;
                            }
                        }
                    }

                    if (!voted) {
                        Candidate.findOneAndUpdate({ _id: cid }, { $push: { 'votedBy': userId } }, (err, cand) => {
                            message = 'You voted ' + cand.name;
                            console.log(message)
                        });
                        console.log('vote casted')                        
                    }
                    res.redirect('/elections/'+pollid)
                                                        
                })
        })
        .catch(err=>console.log(err))
    


})

function ensureAuthenticated(req, res, next) {
    if(req.isAuthenticated()){
        return next();
    }else{
        // req.flash('error_msg', 'You are not logged in');
        res.redirect('/greet');
    }
}



module.exports = router;