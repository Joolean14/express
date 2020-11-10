const express = require('express');
const pool = require('../database');
const router = express.Router();

router.get('/nuevo', (req, res) => {
    console.log("agrego un cliente");
    res.render('clientes/agregar');
});
 
router.post('/nuevo',async(req,res)=>{
    console.log('Agregado');
    // console.log(req.body);
    const { nombres, apellidos, cedula } = req.body;
    const message = { nombres, apellidos, cedula };
    await pool.query('INSERT into clientesNuevos set ?', [message]);
    console.log('agregado');
})

 

module.exports = router;
