const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const db = require('../databases/login');
const dotenv = require('dotenv');
dotenv.config();

const secretKey = process.env.SECRET_KEY;

router.post('/login', async (req, res) => {
    console.log(req.body);

    const { email, password } = req.body;
    const user = await db.login(email, password);

    //verificar correo
    if (!user) {
        return res.status(400).send("El correo electrónico o la contraseña no son correctos");
    }

    //Verificar que las contraseña coincida con la contraseña de la base de datos
    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (!isPasswordCorrect) {
        return res.status(400).send("La contraseña no son correctos");
    }
    else {

        //Generar el token y enviarlo
        const token = jwt.sign({
            id: user._id,
            email: email
        }, secretKey, {
            expiresIn: '1d'
        });
        //guardar el token en la base de datos
        await db.saveToken(token, user._id);
        /*
        res.status(200).send({
            token: token
        });
        */
    }


});