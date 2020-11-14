const express = require('express');
const pool = require('../database');
const router = express.Router();

router.get('/', (req,res) => {
    console.log('Perfil del cliente');
    res.render('clientes/index')
});  

router.get('/nuevo', (req, res) => {
    console.log("agrego un cliente");
    res.render('clientes/agregar');
}); 
 
router.post('/nuevo',async(req,res)=>{
    console.log('Agregado');
    // console.log(req.body);
    const { nombres, apellidos, cedula } = req.body;
    const message = { nombres, apellidos, cedula };
    await pool.query('SELECT * FROM user;', [message]);
    console.log('agregado');
});


router.post('/mostrarClientes', (req,res)=>{
    res.redirect('/clientes/mostrarClientes');
});


router.get('/mostrarClientes', async (req,res)=>{
    const users = await pool.query('SELECT first_name, last_name, fip_total FROM user;');
    res.render('clientes/listar', { users });
    console.log(users);
});
        

module.exports = router;
