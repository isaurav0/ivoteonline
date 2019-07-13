const express = require('express');

const router = express();

router.get('/', (req, res)=>{
    res.render('dashboard',{
        title: 'Dashboard',   
    });
});

module.exports = router ;