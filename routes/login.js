const express = require('express')

const router = express();
const jwt = require('jsonwebtoken');
const gravatar = require('gravatar');
const bcrypt  = require('bcryptjs');
const passport = require('passport');
const User = require('../models/User');
const parser = require('body-parser');

const keys = require('../config/keys');


router.get('/', (req, res, next)=>{
    res.render('login',{
        title: 'login'
    });
})


router.post('/', (req, res) => {
    console.log('login')

    //Validation of Login Splash
    // const {errors, isValid} = validateLoginInput(req.body);
    // if(!isValid){
    //    return res.status(401).json(errors);
    // }
 
    const email = req.body.email;
    const password = req.body.password;
    User.findOne({email: email}).then((user) => {
       if(!user){
          errors.email = 'User not found';
          return res.status(401).json(errors);
       }
 
       bcrypt.compare(password, user.password).then((isMatch) => {
          if(isMatch){
             //Credentials matched
             payload = {id: user.id, name:user.name, email: user.email};
 
             jwt.sign(payload, keys.SECRET, {expiresIn: 36000*100}, (err, token) => {
                res.redirect('dashboard',{
                }, ()=> res.cookie('muji'));
             } );
          } else{
             errors.password = 'Password Incorrect';
             return res.status(401).json(errors);
          }
       });
    }).catch(); //error of find one
 });

module.exports = router ;