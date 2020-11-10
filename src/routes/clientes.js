const express = require('express');
const pool = require('../database');
const router = express.Router();

router.get('/nuevo', (req, res) => {
    console.log("Aqui estoy");
    // res.render('clentes/agregar');
});