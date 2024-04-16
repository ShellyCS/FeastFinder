import { useState } from "react";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import ImageContainer from "./ImageContainer";
const DishesData = () => {
  const [dish, setDish] = useState({
    categoryName: "",
    name: "",
    description: "",
    price: "",
    isVeg: false,
    imageId: "",
  });

  const handleDishChange = (e) => {
    const { name, value } = e.target;
    setDish((prev) => ({ ...prev, [name]: value }));
  };
  const handleImageChange = (event) => {
    const file = event.target.files[0];

    if (file) {
      const reader = new FileReader();

      reader.onloadend = () => {
        setDish((prevRestaurant) => ({
          ...prevRestaurant,
          imageId: reader.result,
        }));
      };

      reader.readAsDataURL(file);
    }
  };
  return (
    <Grid container spacing={2}>
      <Grid item>
        <Typography variant="h6 ">Dish Details</Typography>
      </Grid>
      <Grid item>
        <Grid container alignItems={"center"} spacing={2}>
          <Grid item sm={6} md={3}>
            <TextField
              fullWidth
              label="Category Name"
              name="categoryName"
              value={dish.categoryName}
              onChange={handleDishChange}
              required
            />
          </Grid>
          <Grid item sm={6} md={3}>
            <TextField
              fullWidth
              label="Dish Name"
              name="name"
              value={dish.name}
              onChange={handleDishChange}
              required
            />
          </Grid>
          <Grid item sm={6} md={3}>
            <TextField
              fullWidth
              label="Description"
              name="description"
              value={dish.description}
              onChange={handleDishChange}
              required
            />
          </Grid>
          <Grid item sm={6} md={3}>
            <TextField
              fullWidth
              label="Price"
              name="price"
              value={dish.price}
              onChange={handleDishChange}
              required
            />
          </Grid>
          <Grid item sm={6} md={3}>
            <FormControl fullWidth required>
              <InputLabel id="isVeg-label">Is Veg</InputLabel>
              <Select
                labelId="isVeg-label"
                name="isVeg"
                label="Is Veg"
                value={dish.isVeg}
                onChange={handleDishChange}
              >
                <MenuItem value={true}>Yes</MenuItem>
                <MenuItem value={false}>No</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item>
            <ImageContainer
              label={"Dish Image *"}
              image={dish.imageId}
              onChange={handleImageChange}
            />
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default DishesData;
