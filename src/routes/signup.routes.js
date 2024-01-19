const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const db = require('../databases/signup');
const dotenv = require('dotenv');
dotenv.config();

const secretKey = process.env.SECRET_KEY;


router.post('/signup', async (req, res) => {

    console.log('Recibida solicitud POST en /signup');
    
    const email = req.body.email;
    const password = req.body.password;
    const confirmPassword = req.body['confirm-password'];

    // Validación de formato de correo electrónico
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        return res.status(400).json({status: 'error', error: "El formato del correo electrónico no es válido"});
    }

    // Validación de correo electrónico único en la base de datos
    try {
        console.log('Datos recibidos:', req.body);
        const emailExists = await db.checkEmailExists(email);
        if (emailExists) {
            console.log('1');
            return res.status(400).json({status: 'error', error: "El correo electrónico ya está registrado"});
            
        }
    } catch (error) {
        console.log('2');
        console.error(error);
        return res.status(500).json({status: 'error', error: `Error en la validación de correo electrónico: ${error.message}`});
        
    }

    // Validación de contraseña: mínimo 8 caracteres
    if (password.length < 8 || password !== confirmPassword) {
        console.log('3');
        return res.status(400).json({status: 'error', error: "La contraseña no es valida"});   
    }

    try {
        // Encripta la contraseña antes de guardarla en la base de datos
        const hashedPassword = await bcrypt.hash(password, 10);

        // Llama a la función signUp para guardar los datos en la base de datos
        const userId = await db.signUp( email, hashedPassword);

        // Respuesta exitosa
        res.status(200).json({status: 'success', message: `Registro exitoso para ${email} con ID ${userId}`});
        console.log('4');
    } catch (error) {
        console.error(error);
        res.status(500).json({status: 'error', error: "Error en el registro"});
        console.log('5');
    }
});

module.exports = router;
