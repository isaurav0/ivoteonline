const express = require('express')

const router = express();

router.get('/', (req, res, next)=>{
    res.render('signup',{
        title: 'Signup'
    });
});

module.exports = router ;