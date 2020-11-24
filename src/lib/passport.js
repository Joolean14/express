const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const pool = require('../database');

passport.use('local.register', new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password',
    passReqtoCallback: true
}, async (req, username, password, done) => {
    console.log(req.body);
    console.log('usuariooooo =' + username); 
    console.log('fijo ' + password);
    const {
        first_name,
        last_name,
        email
    } = req.body;
    const usuarioNuevo = {
        password,
        first_name,
        last_name,
        email
    }
    const resultado = await pool.query('INSERT INTO user set ?;', [usuarioNuevo]);
    console.log(resultado);
    return done(null, usuarioNuevo);
}));

passport.serializeUser(function (user, done) {
    done(null, user.user_id);
});

passport.deserializeUser(async (id, done) => {
    const rows = await pool.query('SELECT * FROM user WHERE user_id= ?', [id]);
    done(null, rows[0]);
});