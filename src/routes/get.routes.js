const express = require('express');
const router = express.Router();
const db = require('../databases/db');

router.get("/get-name/:insertId", async (req, res) => {
    try {
        const insertId = req.params.insertId;
        const name = await db.getUserName(insertId);

        if (name) {
            res.status(200).json({ name });
        } else {
            res.status(404).json({ error: "User not found" });
        }
    } catch (error) {
        console.error("Error fetching user's name:", error);
        res.status(500).json({ error: "An error occurred while fetching user's name" });
    }
});

router.get("/get-data/:email", async (req, res) => {
    try {
        const email = req.params.email;
        // Realiza alguna operación para obtener los datos del usuario basados en el correo electrónico
        const userData = await db.getUserData(email);

        if (userData) {
            res.status(200).json(userData);
        } else {
            res.status(404).json({ error: "User not found" });
        }
    } catch (error) {
        console.error("Error fetching user data:", error);
        res.status(500).json({ error: "An error occurred while fetching user data" });
    }
});

router.get('/getItems/:id', async (req, res) => {
    try {
      const userId = req.params.id;
      const links = await db.getLinksWithColumnNames(userId)
      if (links) {
        res.status(200).json({ links });
      } else {
        res.status(404).json({ error: "picture not found" });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "An error occurred" });
    }
  
  })

module.exports = router