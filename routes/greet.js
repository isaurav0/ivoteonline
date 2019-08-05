var express = require('express');
var router = express.Router();

//Get Homepage
router.get('/', function (req, res) {
    res.render('greet', {title: 'iVoteOnline'});
});


router.post('/', (req, res)=>{
    var days = ['Sun', 'Mon', 'Tues', 'Wed', 'Thurs', 'Fri', 'Sat'];
    expireAt = new Date(req.body.expiry_date);
    expireAt.setHours(expireAt.getHours()+5);
    expireAt.setMinutes(expireAt.getMinutes()+45);
    // expireAt = expireAt.toISOString();
    console.log(expireAt)
    var rightnow = new Date();
    rightnow.setHours(rightnow.getHours()+5);
    rightnow.setMinutes(rightnow.getMinutes()+45);

    var ms = Math.abs(expireAt-rightnow);
    var diff=ms/(100*60*60);
    res.json({expireAt,now: rightnow, diff})
})

module.exports = router;