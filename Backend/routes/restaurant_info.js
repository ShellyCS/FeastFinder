const express = require("express");
const router = express.Router();

const db = require("../database/db");

router.get("/", async (req, res) => {
  try {
    const [info] = await db.query("SELECT * FROM restaurant_info");
    res.json(info);
  } catch (error) {
    console.error("Error in fetching restaurant detail", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;
