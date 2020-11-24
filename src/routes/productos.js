const express = require('express');
const pool = require('../database');
const router = express.Router();
 
        
router.get('/', async(req,res) => {
    const products = await pool.query('SELECT product_name, product_price, discount FROM product;');
    res.render('productos/catalogo', { products })
});   
 
router.post('/nuevo',async(req,res)=>{
    const { nombres, apellidos, cedula } = req.body;
    const message = { nombres, apellidos, cedula };
    await pool.query('SELECT product_name, product_price, discount FROM product;', [products]);
});
 

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


router.get('/agregarproducto', (req, res) => {
    console.log("agrego un producto");
    res.render('productos/agregarproducto', { title: 'Agregar'} );
}); 

router.post('/agregarproducto', async(req,res)=> {
    const { product_name, product_price, sku, discount, product_description, quantity_stock, reviews, rating, user_id, fip_value } = req.body;
    const message = { product_name, product_price, sku, discount, product_description, quantity_stock, reviews, rating, user_id, fip_value };
    await pool.query('INSERT INTO product set ?;', [message]);
    console.log('agregado');
    res.redirect("/productos");
}); 

router.get('/fipusuarios', async(req,res) => {
    const fip = await pool.query('SELECT first_name, last_name, fip_total FROM user;');
    res.render('productos/fipusuarios', { fip })
});  
 
router.get('/agregarmedio', (req, res) => {
    res.render('productos/agregarmedio', { title: 'Agregar'} );
}); 
   
router.post('/agregarmedio', async(req,res)=> {
    const { credit_card, debit, cash, user_id } = req.body;
    const message = { credit_card, debit, cash, user_id };
    await pool.query('INSERT INTO payment_method set ?;', [message]);
    console.log('agregado');
    res.redirect("/productos/medios");
});  
 
router.get('/medios', async (req, res) => {
    const medios = await pool.query('SELECT * FROM payment_method;');
    res.render('productos/medios', { medios, title: 'Agregar Medios'} );
}); 

 // cuando es un render busca un archivo
 // cuando es un redirect busca una ruta en routes

module.exports = router;
