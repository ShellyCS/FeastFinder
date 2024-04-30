const express = require("express");
const router = express.Router();
const db = require("../database/db");
const convertBlobToBuffer = require("../utils/convertBlobToBuffer");

router.get("/", async (req, res) => {
  try {
    const [restaurants] = await db.query("SELECT * FROM Restaurants");

    const finalRestaurants = await convertBlobToBuffer(
      restaurants,
      "restaurant_image"
    );

    res.json(finalRestaurants);
  } catch (error) {
    console.error("Error fetching restaurants:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;
