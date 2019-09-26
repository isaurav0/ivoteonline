var express = require('express');
var router = express.Router();

//Get Homepage
router.get('/', function (req, res) {
    res.render('greet', {title: 'iVoteOnline'});
});


router.post('/', (req, res)=>{
    var expiry_date = req.body.expiry_date;

    res.send(expiry_date);
//     expireAt = Date.parse(expiry_date)
//     if(Date.now()>expireAt){
//         res.send('expired')
//     }
//     else
//         res.send('running')
})

module.exports = router;