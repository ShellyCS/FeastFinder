const express = require("express");
const router = express.Router();
const verifyToken = require("./verification");
const db = require("../database/db");
const UUID = require("uuid");

router.post("/upload", verifyToken, async (req, res) => {
  try {
    if (!req.files || !req.files.imageData) {
      return res.status(400).json({ statusText: "No files were uploaded." });
    }
    const imageData = req.files?.imageData; // Assuming you're using express-fileupload middleware
    const uuid = UUID.v4(); // Generate UUID
    await db.query("INSERT INTO images (id, image_data) VALUES (?, ?)", [
      uuid,
      imageData.data,
    ]);

    res
      .status(200)
      .json({ message: "Successfully images were uploaded!", id: uuid });
  } catch (error) {
    console.error("Error fetching dishes data:", error);
    res.status(500).json({ error: "Internal server error!" });
  }
});

router.get("/:id", verifyToken, async (req, res) => {
  try {
    const id = req.params.id;
    const [result] = await db.query("SELECT * FROM images WHERE id = ?", [id]);
    res.json({ imageData: result[0] });
  } catch (error) {
    console.error("Error fetching dishes data:", error);
    res.status(500).json({ error: "Internal server error!" });
  }
});

module.exports = router;
