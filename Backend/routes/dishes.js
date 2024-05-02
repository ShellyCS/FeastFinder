const express = require("express");
const router = express.Router();
const db = require("../database/db");
const convertBlobToBuffer = require("../utils/convertBlobToBuffer");

router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const [results] = await db.query(
      "SELECT * FROM Dishes Where restaurantId = ?",
      [id]
    );
    const finalDishes = await convertBlobToBuffer(results, "imageId");

    res.json(finalDishes);
  } catch (error) {
    console.error("Error fetching dishes data:", error);
    res.status(500).json({ error: "Internal server error!" });
  }
});

module.exports = router;
