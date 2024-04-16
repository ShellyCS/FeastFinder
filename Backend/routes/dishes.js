const express = require("express");
const router = express.Router();
const db = require("../database/db");

router.get("/", async (req, res) => {
  try {
    const [results] = await db.query("SELECT * FROM Dishes");
    const mappedData = results.map((item) => ({
      card: {
        card: {
          "@type":
            "type.googleapis.com/swiggy.presentation.food.v2.ItemCategory",
          title: item.categoryName,
          restaurantId: item.restaurantId,
          itemCards: [
            {
              "@type": "type.googleapis.com/swiggy.presentation.food.v2.Dish",
              analytics: {},
              hideRestaurantDetails: true,
              info: {
                badgesV2: {},
              },
              category: item.categoryName,
              defaultPrice: item.defaultPrice,
              description: item.description,
              id: item.id,
              imageId: item.imageId,
              isVeg: item.isVeg,
              itemAttribute: item.itemAttribute,
              itemBadge: {},
              itemPriceStrikeOff: true,
              name: item.name,
              ratings: {
                aggregatedRating: {},
              },
              ribbon: {},
              showImage: true,
              variants: {},
              variantsV2: {
                variantGroups: [],
                pricingModels: [],
              },
            },
          ],
        },
      },
    }));
    res.json(mappedData);
  } catch (error) {
    console.error("Error fetching dishes data:", error);
    res.status(500).json({ error: "Internal server error!" });
  }
});

module.exports = router;
