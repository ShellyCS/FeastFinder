const db = require("../database/db");
async function convertBlobToBuffer(restaurants, restaurant_image) {
  const finalRestaurants = await Promise.all(
    restaurants.map(async (restaurant) => {
      const image = restaurant[restaurant_image];
      if (image?.includes("CUSTOM")) {
        const [result] = await db.query("SELECT * FROM images WHERE id = ?", [
          image.replace("CUSTOM", ""),
        ]);
        const base64Image = Buffer.from(result[0].image_data).toString(
          "base64"
        );
        restaurant.base64Image = base64Image;
      }

      return restaurant;
    })
  );
  return finalRestaurants;
}

module.exports = convertBlobToBuffer;
