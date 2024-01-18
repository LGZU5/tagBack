const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const db = require('../databases/db');

const secretKey = 'abcdefghijk';

router.post('/signup', async (req, res) => {
    console.log(req.body);

    const email = req.body.email;
    const password = req.body.password;
    const confirmPassword = req.body['confirm-password'];

    // Validación de contraseña: mínimo 8 caracteres
    if (password.length < 8) {
        return res.status(400).send("La contraseña debe tener al menos 8 caracteres");
    }

    // Validación de correo electrónico único en la base de datos
    try {
        const emailExists = await db.checkEmailExists(email);
        if (emailExists) {
            return res.status(400).send("El correo electrónico ya está registrado");
        }
    } catch (error) {
        console.error(error);
        return res.status(500).send("Error en la validación de correo electrónico");
    }

    // Validación de formato de correo electrónico
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        return res.status(400).send("El formato del correo electrónico no es válido");
    }

    // Validación de coincidencia de contraseña y confirmación de contraseña
    if (password !== confirmPassword) {
        return res.status(400).send("Las contraseñas no coinciden");
    }

    try {
        // Encripta la contraseña antes de guardarla en la base de datos
        const hashedPassword = await bcrypt.hash(password, 10);

        // Llama a la función signUp para guardar los datos en la base de datos
        const userId = await db.signUp(email, hashedPassword);

        // Respuesta exitosa
        res.send(`Registro exitoso para ${email} con ID ${userId}`);
    } catch (error) {
        console.error(error);
        res.status(500).send("Error en el registro");
    }
});

module.exports = router;
