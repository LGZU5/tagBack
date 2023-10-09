const express = require('express');
const router = express.Router();
const db = require('../databases/db');

router.post("/createName", async (req, res) => {
  try {
    const { insertId, name } = req.body; // Obtén el user_id y el nombre del cuerpo de la solicitud

    // Genera un número aleatorio y elimina los espacios en blanco del nombre
    const randomNumber = Math.floor(Math.random() * 1000000); // Puedes ajustar el rango según tus necesidades
    const sanitizedName = name.replace(/\s/g, ''); // Elimina espacios en blanco

    // Combina el nombre original con el número aleatorio
    const nickname = `${sanitizedName}${randomNumber}`;

    // Inserta el nombre y el apodo en la base de datos
    const result = await db.createName(insertId, name, nickname);

    res.status(201).json({ message: "Creación de nombre exitosa", result });
  } catch (error) {
    res.status(500).json({ error: "Error insertando el nombre", error });
  }
});


router.put("/updateName", async (req, res) => {
  try {
    const { editName, idUser } = req.body;
    const result = await db.updateName(editName, idUser);

    if (result.success) {
      res.status(201).json({ message: "Name updated successfully" });
    } else {
      res.status(400).json({ error: result.message });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "An error occurred while updating name" });
  }
});

router.put("/updateDescription", async (req, res) => {
  try {
    const { editParraf, idUser } = req.body;
    const result = await db.updateParraf(editParraf, idUser);

    if (result.success) {
      res.status(201).json({ message: "Name updated successfully" });
    } else {
      res.status(400).json({ error: result.message });
    }
  } catch (error) {
    console.error('Error en el manejador de rutas al actualizar la descripción:', error);
    res.status(500).json({ error: 'An error occurred while updating description' });
  }

});

module.exports = router