const express = require('express');
const pool = require('../database');
const router = express.Router();

router.get('/comprar', (req, res) => {
    res.render('store/comprar');
});

router.post('/comprar', async (req, res) => {
    const { email, categoria, mensaje } = req.body;
    const message = { email, categoria, mensaje, };
    await pool.query('INSERT into customer_support set ?', [message]);
    console.log('probando');
    res.redirect('store/carrito');
});

router.get('/comprar', async (req, res) => {
    const respuesta = await pool.query('SELECT * FROM customer_support');
    res.render('store/carrito', { respuesta });
});


module.exports = router;
