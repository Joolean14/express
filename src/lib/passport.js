const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const pool = require('../database'); 
const helpers = require('../lib/bcrypt');

passport.use('local.signup', new LocalStrategy({
    usernameField: 'username',
    passwordField: 'password',
    passReqToCallback: true
}, async (req, username, password, done) => {
    console.log('username = ', username);
    console.log('password = ', password);
    console.log('req.body = ', req.body);

    const {fullname
} = req.body;
    const newUser = {
        email: username,
        password, 
        first_name:fullname,
        last_name: "Loaiza"
    };
    newUser.password = await helpers.encrypt(password);
    const resultado = await pool.query('INSERT INTO user SET ?', [newUser]);
    console.log(resultado);
    newUser.id = resultado.insertId;
    return done(null, newUser);   
}));     

passport.use('local.login', new LocalStrategy({
    usernameField: 'username',
    passwordField: 'password',
    passReqToCallback: true
}, async (req, username, password, done) => {
    const {fullname} = req.body; 
      
    //Comparar la clave
    const passwordDBextract = await pool.query("SELECT * FROM user WHERE email = ?;", [username]);
    console.log(passwordDBextract[0]);
    const success = helpers.compare(password, passwordDBextract[0].password);
    if (success) {
        return done(null, passwordDBextract[0]);   
    } else {
        return done(null, false);   
    }
}));   



passport.serializeUser(function (user, done) {
    done(null, user.email);
});

passport.deserializeUser(async (id, done) => {
    const rows = await pool.query('SELECT * FROM user WHERE user_id= ?', [id]);
    done(null, rows[0]);
});