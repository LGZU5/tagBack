const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const db = require('../databases/db')

const secretKey = 'abcdefghijk';

router.post('/signup', (req, res) => {
    console.log(req.body); // Agrega esta línea para imprimir el cuerpo de la solicitud en la consola
    const email = req.body.email;
    const password = req.body.password;
    const confirmPassword = req.body['confirm-password'];

    // Validaciones y lógica de registro aquí

    // Respuesta simple para este ejemplo
    res.send(`Registro exitoso para ${email}`);
});


module.exports = router;
