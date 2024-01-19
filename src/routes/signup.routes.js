const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const db = require('../databases/signup');


const secretKey = 'abcdefghijk';

router.post('/signup', async (req, res) => {
    console.log(req.body);
    
    const name = req.body.name;
    const email = req.body.email;
    const password = req.body.password;
    const confirmPassword = req.body['confirm-password'];

    // Validación de formato de correo electrónico
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        return res.status(400).json("El formato del correo electrónico no es válido");
    }

    // Validación de correo electrónico único en la base de datos
    try {
        const emailExists = await db.checkEmailExists(email);
        if (emailExists) {
            return res.status(400).json("El correo electrónico ya está registrado");
        }
    } catch (error) {
        console.error(error);
        return res.status(500).json("Error en la validación de correo electrónico");
    }

    // Validación de contraseña: mínimo 8 caracteres
    if (password.length < 8 || password !== confirmPassword) {
        return res.status(400).json("La contraseña no es valida");
    }

    try {
        // Encripta la contraseña antes de guardarla en la base de datos
        const hashedPassword = await bcrypt.hash(password, 10);

        // Llama a la función signUp para guardar los datos en la base de datos
        const userId = await db.signUp(email, hashedPassword);

        // Respuesta exitosa
        res.status(200).json(`Registro exitoso para ${email} con ID ${userId}`);
    } catch (error) {
        console.error(error);
        res.status(500).json("Error en el registro");
    }
});

module.exports = router;
