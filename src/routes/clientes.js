const express = require('express');
const pool = require('../database');
const router = express.Router();

router.get('/', (req,res) => {
    console.log('Perfil del cliente');
    res.render('clientes/index')
});  
 
router.get('/nuevo', (req, res) => {
    console.log("agrego un cliente");
    res.render('clientes/agregar', { title: 'Agregar'} );
}); 
 
router.post('/nuevo',async(req,res)=>{
    const { password, first_name, last_name, email, fip_total } = req.body;
    const message = { password, first_name, last_name, email, fip_total };
    await pool.query('INSERT INTO user set ?;', [message]);
    console.log('agregado');
    res.redirect("/clientes/mostrarClientes");
}); 

 





router.get('/mostrarClientes', async (req,res)=>{
    const users = await pool.query('SELECT first_name, last_name, fip_total FROM user;');
    res.render('clientes/listar', { users });
    console.log(users);
});
        

module.exports = router;
