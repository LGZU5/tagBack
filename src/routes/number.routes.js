const express = require('express');
const router = express.Router();
const db = require('../databases/db');

router.post("/createNumber", async (req, res) => {
    try {
      const { insertId, number } = req.body;
      const fullPhoneNumber = `tel:+57${number}`;
      const fullWhatsapp = `https://wa.me/57${number}`
      const result = await db.updatePhoneNumber(insertId, fullPhoneNumber, fullWhatsapp);
      res.status(200).json({ message: "Phone number updated successfully", result });
    } catch (error) {
      res.status(500).json({ error: "An error occurred while updating phone number" });
    }
  });

  module.exports = router