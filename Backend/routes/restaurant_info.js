const express = require("express");
const router = express.Router();

const db = require("../database/db");
const convertBlobToBuffer = require("../utils/convertBlobToBuffer");

router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    console.log({ id });
    console.log("called");
    const [info] = await db.query(
      "SELECT * FROM restaurant_info Where restaurantId = ?",
      [id]
    );
    console.log({ info });
    const finalRestaurants_Info = await convertBlobToBuffer(
      info,
      "cloudinaryImageId"
    );
    res.json(finalRestaurants_Info);
  } catch (error) {
    console.error("Error in fetching restaurant detail", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;
