import { useState } from "react";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";

import ImageContainer from "./ImageContainer";
const Restaurant = () => {
  const [restaurant, setRestaurant] = useState({
    name: "",
    areaName: "",
    restaurant_image: "",
    city: "",
  });

  const handleRestaurantChange = (e) => {
    const { name, value } = e.target;
    setRestaurant((prev) => ({ ...prev, [name]: value }));
  };
  const handleImageChange = (event) => {
    const file = event.target.files[0];

    if (file) {
      const reader = new FileReader();

      reader.onloadend = () => {
        setRestaurant((prevRestaurant) => ({
          ...prevRestaurant,
          restaurant_image: reader.result,
        }));
      };

      reader.readAsDataURL(file);
    }
  };
  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <Typography variant="h6 ">Restaurant Registration</Typography>
      </Grid>
      <Grid item>
        <Grid container alignItems={"center"} spacing={2}>
          <Grid item sm={6} md={3}>
            <TextField
              fullWidth
              label="Name"
              name="name"
              value={restaurant.name}
              onChange={handleRestaurantChange}
              required
            />
          </Grid>
          <Grid item sm={6} md={3}>
            <TextField
              fullWidth
              label="Address1"
              name="areaName"
              value={restaurant.areaName}
              onChange={handleRestaurantChange}
              required
            />
          </Grid>

          <Grid item sm={6} md={3}>
            <TextField
              fullWidth
              label="City"
              name="city"
              value={restaurant.city}
              onChange={handleRestaurantChange}
              required
            />
          </Grid>
          <Grid item sm={6} md={3}>
            <TextField
              fullWidth
              label="Country"
              name="country"
              value={restaurant.city}
              onChange={handleRestaurantChange}
              required
            />
          </Grid>
          <Grid item>
            <ImageContainer
              label={"Restaurant Image *"}
              image={restaurant.restaurant_image}
              onChange={handleImageChange}
            />
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default Restaurant;
