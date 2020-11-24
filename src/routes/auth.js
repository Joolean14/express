const express = require('express');
const passport = require('passport');
const pool = require('../database');
const router = express.Router();

  
router.get('/signup', (req,res) => {  
    res.render('auth/login')
});   

router.post('/signup', passport.authenticate('local.register', {
    successRedirect : '/productos',
    failureRedirect : '/signup'
})); 



module.exports = router;