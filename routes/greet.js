var express = require('express');
var router = express.Router();

//Get Homepage
router.get('/', function (req, res) {
    res.render('greet');
});

module.exports = router;