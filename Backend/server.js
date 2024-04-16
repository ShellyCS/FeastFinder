const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();

const restaurantRoutes = require("./routes/restaurants");
const authRoutes = require("./routes/auth");
const restaurantInfoRoutes = require("./routes/restaurant_info");
const dishesRoutes = require("./routes/dishes");

require("dotenv").config();

app.use(cors());
app.use(bodyParser.json());

app.use("/restaurants", restaurantRoutes);
app.use("/", authRoutes);
app.use("/restaurant_info", restaurantInfoRoutes);
app.use("/dishes", dishesRoutes);

app.listen(8081, () => {
  console.log("listening...");
});
