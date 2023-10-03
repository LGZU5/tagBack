const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const db = require('../databases/db')

const secretKey = 'abcdefghijk';

router.post("/login", async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await db.Login(email, password);
        if (!user) {
            return res.status(401).json({ message: "Usuario no encontrado" });
        }
        const dbPassword = user.password;
        const passwordMatch = await bcrypt.compare(password, dbPassword);
        if (!passwordMatch) {
            return res.status(401).json({ message: "Contraseña incorrecta" });
        }
        const token = jwt.sign(user, secretKey);

        res.status(200).json({ message: "Inicio de sesión exitoso", token: token });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Error al procesar la solicitud" });
    }
});

module.exports = router