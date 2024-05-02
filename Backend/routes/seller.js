const express = require("express");
const router = express.Router();
const db = require("../database/db");
const verifyToken = require("./verification");
const convertBlobToBuffer = require("../utils/convertBlobToBuffer");

router.post("/checkIsSeller", verifyToken, async (req, res) => {
  try {
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
        const [initial_dishes] = await db.query(
          "SELECT * FROM Dishes WHERE restaurantId = ?",
          [restaurantId]
        );
        const [data] = await db.query(
          "SELECT * FROM Dishes WHERE restaurantId = ?",
          [restaurantId]
        );

        const final_Dishes = await convertBlobToBuffer(
          initial_dishes,
          "imageId"
        );
        res.json({
          restaurant: finalRestaurants,
          restaurant_info: final_Restaurant_info,
          dishes: final_Dishes,
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
      let customImage = restaurant_image;
      if (!restaurant_image?.includes("CUSTOM")) {
        customImage = "CUSTOM" + restaurant_image;
      }
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
        await db.query(
          "UPDATE restaurants SET name = ?, areaName = ?, restaurant_image = ? WHERE id = ?",
          [name, areaName, customImage, req.user.userId]
        );
        await db.query(
          "UPDATE restaurant_info SET name = ?, city = ?, costForTwo = ?, cloudinaryImageId = ? WHERE restaurantId = ?",
          [name, city, costForTwo, customImage, req.user.userId]
        );
        res.status(200).json({
          statusText: "Seller data has been updated!",
          restaurantId: req.user.userId,
        });
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

router.post("/sellerAddingDishes", verifyToken, async (req, res) => {
  try {
    const { dishesData } = req.body;
    const userId = req.user?.userId;

    if (!userId) {
      throw new Error("Login to perform this action.");
    }

    const insertedDishes = [];
    const updatedDishes = [];
    const [allCategories] = await db.query(
      "SELECT categoryName FROM MenuCategory WHERE restaurantId = ?",
      [userId]
    );

    // Delete previously created dishes and categories that do not exist in the user's input
    for (const category of allCategories) {
      if (
        !dishesData.some((dish) => dish.categoryName === category.categoryName)
      ) {
        // Delete dishes in this category
        await db.query(
          "DELETE FROM Dishes WHERE restaurantId = ? AND categoryName = ?",
          [userId, category.categoryName]
        );

        // Delete the category itself
        await db.query(
          "DELETE FROM MenuCategory WHERE restaurantId = ? AND categoryName = ?",
          [userId, category.categoryName]
        );
      }
    }
    for (const dish of dishesData) {
      const { categoryName, name, description, price, isVeg, imageId } = dish;
      let customImageId = imageId;
      if (!imageId?.includes("CUSTOM")) {
        customImageId = "CUSTOM" + imageId;
      }
      // Check if the category exists for the restaurant
      const [categoryExists] = await db.query(
        "SELECT categoryId FROM MenuCategory WHERE restaurantId = ? AND categoryName = ?",
        [userId, categoryName]
      );
      if (!categoryExists.length) {
        // If the category doesn't exist, insert a new category
        const [insertedCategory] = await db.query(
          "INSERT INTO MenuCategory (restaurantId, categoryName) VALUES (?, ?)",
          [userId, categoryName]
        );
      }

      // Check if the dish exists
      const [existingDish] = await db.query(
        "SELECT dishId FROM Dishes WHERE restaurantId = ? AND categoryName = ?",
        [userId, categoryName]
      );

      if (existingDish.length) {
        // If the dish exists, update the dish
        await db.query(
          "UPDATE Dishes SET description = ?, price = ?, isVeg = ?, imageId = ?, categoryName = ? WHERE dishId = ?",
          [
            description,
            price,
            isVeg,
            customImageId,
            categoryName,
            existingDish[0].dishId,
          ]
        );
        updatedDishes.push(existingDish[0].dishId);
      } else {
        // If the dish doesn't exist, insert a new dish
        const [insertedDish] = await db.query(
          "INSERT INTO Dishes (restaurantId, name, description, price, isVeg, imageId, categoryName) VALUES (?, ?, ?, ?, ?, ?, ?)",
          [userId, name, description, price, isVeg, customImageId, categoryName]
        );
        insertedDishes.push(insertedDish.insertId);
      }
    }

    res.status(200).json({
      statusText: "Dishes data has been processed!",
      insertedDishes,
      updatedDishes,
    });
  } catch (error) {
    console.error("Error adding/updating dishes:", error);
    res.status(500).json({ error: "Internal server error!" });
  }
});

module.exports = router;
