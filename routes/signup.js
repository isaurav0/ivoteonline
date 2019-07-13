const express = require('express');
const gravatar = require('gravatar');
const bcrypt  = require('bcryptjs');
const jwt = require('jsonwebtoken');
const passport = require('passport');
const User = require('../models/User');
const parser = require('body-parser');

const router = express();

router.get('/', (req, res, next)=>{
    res.render('signup');
})


router.post('/', (req, res) => {
    console.log('FUCK U')

    // const {errors, isValid} = validateRegisterInput(req.body);
    // //check validation
    // if(!isValid){
    //    return res.status(400).json(errors);
    // }
    if(req.body.password !== req.body.password2){
        return res.send('muji')
    }
 
 
    User.findOne({email: req.body.email}).then(user => {
       if(user){
          errors.email = 'Email already exists';
          return res.status(400).json(errors);
       }else{
          const avatar = gravatar.url(req.body.email, {
             s: '200',
             r: 'pg',
             d: 'mm'
          });
          const newUser = new User({
             name: req.body.name,
             email: req.body.email,
             password: req.body.password,
             avatar,
            //  faculty: req.body.faculty
          })
 
          bcrypt.genSalt(10, (err, salt) => {
             bcrypt.hash(newUser.password, salt, (err, hash) => {
                if (err) throw err;
                newUser.password = hash;
 
                newUser
                   .save()
                   .then(user => {
                       res.render('signup')
                    })
                   .catch(err => console.log(err));
             });
          });
       }
    });
 });

module.exports = router ;