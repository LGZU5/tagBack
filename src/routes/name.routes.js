const express = require('express');
const router = express.Router();
const db = require('../databases/db');

router.post("/createName", async (req, res) => {
    try {
        const { insertId, name } = req.body; // Obtén el user_id y el nombre del cuerpo de la solicitud
        const result = await db.createName(insertId, name);
        res.status(201).json({ message: "creacion de nombre exitosa", result });
    } catch (error) {
        res.status(500).json({ error: "error insertando el nombre", error});
    }
});


router.put("/updateName", async (req, res) => {
    try {
        const { editName, idUser } = req.body;
        const result = await db.updateName(editName, idUser);

        if (result.success) {
            res.status(201).json({ message: "nombre actualizado" });
        } else {
            res.status(400).json({ error: result.message });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error });
    }
});

module.exports = router