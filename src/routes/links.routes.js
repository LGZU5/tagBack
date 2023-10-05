const express = require('express');
const router = express.Router();
const db = require('../databases/db');

router.post("/links", async (req, res) => {
    try {
        const { selectedTextValue, userInput, storedIdNumber } = req.body;
        console.log(`${selectedTextValue} ${userInput} ${storedIdNumber}`)
        const result = await db.addLinks(selectedTextValue, userInput, storedIdNumber);
        console.log('Resultado de la inserción:', result);
        res.status(201).json({ message: "Link actualizado exitosamente", result });
    } catch (error) {
        console.error("Error en la ruta POST /links:", error);
        res.status(500).json({ error: error.message });
    }
})

module.exports = router