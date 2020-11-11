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
     res.redirect('store/carrito'); 
})

module.exports = router;