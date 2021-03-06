const express = require('express');
const pool = require('../database');
const router = express.Router();

router.get('/nuevoEmpleado', (req, res) => {
    res.render('empleados/add');
});

router.post('/nuevoProducto', async(req, res)=>{
    console.log(req.body); 
    const data = req.body;
    await pool.query('INSERT into producto set ?', [data]);
     res.redirect('empleados/total-empleados'); 
})

module.exports = router;
