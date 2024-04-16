const express = require("express");
const router = express.Router();
const db = require("../database/db");

router.get("/", async (req, res) => {
  try {
    const [restaurants] = await db.query("SELECT * FROM Restaurants");
    res.json(restaurants);
  } catch (error) {
    console.error("Error fetching restaurants:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;
