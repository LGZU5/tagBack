const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const db = require('../databases/auth');

const secretKey = 'abcdefghijk';

router.post('/signup', async (req, res) => {
    console.log(req.body);

    const email = req.body.email;
    const password = req.body.password;
    const confirmPassword = req.body['confirm-password'];

    // Validación de formato de correo electrónico
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        return res.status(400).send("El formato del correo electrónico no es válido");
    } else {
        // Validación de correo electrónico único en la base de datos
        try {
            const emailExists = await db.checkEmailExists(email);
            if (emailExists) {
                return res.status(400).send("El correo electrónico ya está registrado");
            } else {
                var validEmail = email;
            }
        } catch (error) {
            console.error(error);
            return res.status(500).send("Error en la validación de correo electrónico");
        }
    }

    // Validación de contraseña: mínimo 8 caracteres
    if (password.length < 8 && password !== confirmPassword) {
        return res.status(400).send("La contraseña no es valida");
    } else {
        // Encripta la contraseña antes de guardarla en la base de datos
        var hashedPassword = await bcrypt.hash(password, 10);
        return res.status(200).send("contraseña valida")
    }

    try {
        // Llama a la función signUp para guardar los datos en la base de datos
        const userId = await db.signUp(validEmail, hashedPassword);

        // Respuesta exitosa
        res.send(`Registro exitoso para ${validEmail} con ID ${userId}`);
    } catch (error) {
        console.error(error);
        res.status(500).send("Error en el registro");
    }
});

module.exports = router;
