const express = require('express');
const passport = require('passport');
const pool = require('../database');
const router = express.Router();

  
router.get('/signup', (req,res) => {  
    res.render('auth/signup'); 
});   

router.post('/signup', passport.authenticate('local.signup', {
    successRedirect : '/productos',
    failureRedirect : '/signup'
})); 

router.get('/login', (req,res) => {  
    res.render('auth/login'); 
});   

router.post('/login', passport.authenticate('local.login', {
    successRedirect : '/productos',
    failureRedirect : '/signup'
})); 



module.exports = router;