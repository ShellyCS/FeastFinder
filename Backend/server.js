const express = require("express");
const fileUpload = require("express-fileupload");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();

const restaurantRoutes = require("./routes/restaurants");
const authRoutes = require("./routes/auth");
const restaurantInfoRoutes = require("./routes/restaurant_info");
const dishesRoutes = require("./routes/dishes");
const seller = require("./routes/seller.js");
const images = require("./routes/images.js");
const orders = require("./routes/orders.js");

require("dotenv").config();

app.use(cors());
app.use(bodyParser.json());
app.use(fileUpload());

app.use("/restaurants", restaurantRoutes);
app.use("/", authRoutes);
app.use("/restaurant_info", restaurantInfoRoutes);
app.use("/dishes", dishesRoutes);
app.use("/seller", seller);
app.use("/images", images);
app.use("/orders", orders);
app.listen(8081, () => {
  console.log("listening...");
});
