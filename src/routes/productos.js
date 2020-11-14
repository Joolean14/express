const express = require('express');
const pool = require('../database');
const router = express.Router();

router.get('/', (req,res) => {
    console.log('Productos');
    res.render('/productos/catalogo')
});   

 
router.post('/nuevo',async(req,res)=>{
    const { nombres, apellidos, cedula } = req.body;
    const message = { nombres, apellidos, cedula };
    await pool.query('SELECT product_name, product_price, discount FROM product;', [products]);
    console.log('mostrando');
});


// router.get('/mostrarClientes', async (req,res)=>{
//     const users = await pool.query('SELECT first_name, last_name, fip_total FROM user;');
//     res.render('clientes/listar', { users });
//     console.log(users);
// });

module.exports = router;
