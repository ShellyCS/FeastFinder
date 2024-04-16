const express = require("express");
const router = express.Router();
const db = require("../database/db");

router.get("/", async (req, res) => {
  try {
    const [results] = await db.query("SELECT * FROM Dishes");
    res.json(results);
  } catch (error) {
    console.error("Error fetching dishes data:", error);
    res.status(500).json({ error: "Internal server error!" });
  }
});

module.exports = router;
