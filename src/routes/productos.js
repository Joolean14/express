const express = require('express');
const pool = require('../database');
const router = express.Router();

router.get('/', (req,res) => {
    res.render('productos/catalogo')
});   
 
router.post('/nuevo',async(req,res)=>{
    const { nombres, apellidos, cedula } = req.body;
    const message = { nombres, apellidos, cedula };
    await pool.query('SELECT product_name, product_price, discount FROM product;', [products]);
});
 
//nuevo en clase

router.get('/masbaratos',async(req,res)=>{
    const baratos = await pool.query('SELECT product_name, product_price FROM product WHERE product.product_price < 25;');
    res.render('productos/masbaratos', { baratos })
});
 
router.get('/mascaros',async(req,res)=>{
    const caros = await pool.query('SELECT product_name, product_price FROM product WHERE product.product_price > 25;');
    res.render('productos/mascaros', { caros })
});   

router.post('/todascamisetas',async(req,res)=>{
    const { nombres, apellidos, cedula } = req.body;
    const message = { nombres, apellidos, cedula };
    await pool.query('SELECT product_name FROM product WHERE product.product_name = Camiseta;', [products]);
});
 

module.exports = router;
