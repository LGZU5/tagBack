const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const db = require('../databases/db')

const secretKey = 'abcdefghijk';

router.post("/signup", async (req, res) => {
    try {
        const { email, password } = req.body;
        const cryptPass = await bcrypt.hash(password, 10)
        const result = await db.signUp(email, cryptPass);
        const user = {
            id: result, // Supongamos que result contiene el ID del usuario registrado
            email: email // Puedes agregar más información aquí si lo necesitas
        };

        const token = jwt.sign(user, secretKey);

        res.status(201).json({ message: "User registered successfully", user_id: result, token: token });
    } catch (error) {
        res.status(500).json({ error: error.message || "An error occurred while registering user" });
    }
});

module.exports = router