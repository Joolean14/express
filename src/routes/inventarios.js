const express = require('express');
const pool = require('../database');
const router = express.Router();

router.get('/nuevoProducto', (req, res) => {
    res.render('inventarios/add');
});

router.post('/nuevoProducto', async(req, res)=>{
    console.log(req.body); 
    const data = req.body;
    await pool.query('INSERT into producto set ?', [data]);
    res.redirect('inventarios/inv');
});

router.get('/list', async(req, res) => {
    const respuesta = await pool.query('SELECT * FROM producto');
    res.render('inventarios/inv', { respuesta });
});  

module.exports = router;