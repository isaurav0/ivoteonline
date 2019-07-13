const express = require('express')

const router = express();

router.get('/', (req, res, next)=>{
    res.render('login',{
        title: 'login'
    });
});

module.exports = router ;