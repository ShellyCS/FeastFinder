const express = require("express");
const router = express.Router();
const db = require("../database/db");
const verifyToken = require("./verification");
const convertBlobToBuffer = require("../utils/convertBlobToBuffer");

router.post("/checkIsSeller", verifyToken, async (req, res) => {
  try {
    console.log({ user: req.user });
    if (req.user?.userId) {
      const [existingSeller] = await db.query(
        "SELECT * FROM userASSeller WHERE userId = ?",
        [req.user.userId]
      );
      if (existingSeller?.[0]?.restaurantId) {
        const restaurantId = existingSeller?.[0]?.restaurantId;
        const [initialRestaurant] = await db.query(
          "SELECT * FROM restaurants WHERE id = ?",
          [restaurantId]
        );
        const finalRestaurants = await convertBlobToBuffer(
          initialRestaurant,
          "restaurant_image"
        );
        const [initial_Restaurant_info] = await db.query(
          "SELECT * FROM restaurant_info WHERE restaurantId = ?",
          [restaurantId]
        );
        const final_Restaurant_info = await convertBlobToBuffer(
          initial_Restaurant_info,
          "cloudinaryImageId"
        );
        const [dishes] = await db.query(
          "SELECT * FROM Dishes WHERE restaurantId = ?",
          [restaurantId]
        );
        res.json({
          restaurant: finalRestaurants,
          restaurant_info: final_Restaurant_info,
          dishes,
        });
      } else {
        res.status(201).json({});
      }
    } else {
      res.status(201).json({});
    }
  } catch (error) {
    console.error("Error fetching dishes data:", error);
    res.status(500).json({ error: "Internal server error!" });
  }
});
router.post("/sellerOnBoarding", verifyToken, async (req, res) => {
  try {
    const { name, areaName, restaurant_image, city, costForTwo } = req.body;
    if (req.user?.userId) {
      const customImage = "CUSTOM" + restaurant_image;
      const [existingUser] = await db.query(
        "SELECT * FROM userASSeller WHERE userId = ?",
        [req.user.userId]
      );
      if (!existingUser[0]?.userId) {
        // If the user ID doesn't exist, insert a new record
        await db.query(
          "INSERT INTO restaurants (id, name, areaName, avgRating, restaurant_image) VALUES (?, ?, ?, ?, ?)",
          [req.user.userId, name, areaName, 0.0, customImage]
        );
        await db.query(
          "INSERT INTO restaurant_info (name, restaurantId, city, avgRating, costForTwo, cloudinaryImageId, totalRatings) VALUES (?, ?, ?, ?, ?, ?, ?)",
          [name, req.user.userId, city, 0.0, costForTwo, customImage, 0]
        );
        await db.query(
          "INSERT INTO userASSeller (userId, restaurantId) VALUES (?, ?)",
          [req.user.userId, req.user.userId]
        );
        res.status(200).json({
          statusText: "Successfully seller has been created!",
          restaurantId: req.user.userId,
        });
      } else {
        // If the user ID already exists, handle accordingly (optional)
        console.log("User already be a seller.");
        throw new Error("User already be a seller.");
      }
    } else {
      console.log("Login to perform this action.");

      throw new Error("Login to perform this action.");
    }
  } catch (error) {
    console.error("Error fetching dishes data:", error);
    res.status(500).json({ error: "Internal server error!" });
  }
});

module.exports = router;
