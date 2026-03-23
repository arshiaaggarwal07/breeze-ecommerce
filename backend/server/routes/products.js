const express = require('express');
const router = express.Router();

router.post('/add', async (req, res) => {
  try {
    res.status(201).json({ message: "Product route working" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

module.exports = router;