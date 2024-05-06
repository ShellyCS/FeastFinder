import { useEffect, useState } from "react";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import ImageContainer from "./ImageContainer";
import Button from "@mui/material/Button";
import { useSnackbar } from "notistack";
import { mainRoute, postRequest } from "../../api";
import { useDispatch, useSelector } from "react-redux";
import { logoutUser } from "../../utils/slices/UserSlice";
import { emptyCart } from "../../utils/slices/cartsSlice";

const DishesRegistration = () => {
  const { enqueueSnackbar } = useSnackbar();
  const dispatch = useDispatch();

  const [dishes, setDishes] = useState([
    {
      categoryName: "",
      name: "",
      description: "",
      price: "",
      isVeg: false,
      imageFile: "",
    },
  ]);
  const token = useSelector((state) => state.user.token);
  const [errors, setErrors] = useState({});
  const [disableAddButton, setDisableAddButton] = useState(false);

  const handleDishChange = (index, e) => {
    const { name, value } = e.target;
    const updatedDishes = [...dishes];
    updatedDishes[index] = { ...updatedDishes[index], [name]: value };
    setDishes(updatedDishes);
  };

  const handleImageChange = (index, event) => {
    const updatedDishes = [...dishes];
    if (event.file) {
      updatedDishes[index] = { ...updatedDishes[index], imageFile: event.file };
    } else {
      updatedDishes[index] = {
        ...updatedDishes[index],
        imageFile: "",
        imageId: "",
      };
    }
    setDishes(updatedDishes);
  };
  const handleDishRegistrationSubmit = async (event) => {
    event.preventDefault();
    // Validation
    const validationErrors = {};
    dishes.forEach((dish, index) => {
      if (!dish.categoryName)
        validationErrors[`categoryName-${index}`] = "Category Name is required";
      if (!dish.name) validationErrors[`name-${index}`] = "Name is required";
      if (!dish.description)
        validationErrors[`description-${index}`] = "Description is required";
      if (!dish.price) validationErrors[`price-${index}`] = "Price is required";
      if (!dish.imageFile && !dish.imageId)
        validationErrors[`imageFile-${index}`] = "Image is required";
    });
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    } else {
      setErrors(validationErrors);
    }
    try {
      const uploadedImages = await Promise.all(
        dishes.map(async (dish, index) => {
          if (dish.imageFile) {
            const formData = new FormData();
            formData.append("imageData", dish.imageFile);
            const response = await fetch(mainRoute + "/images/upload", {
              method: "POST",
              headers: {
                authorization: token,
              },
              body: formData,
            }).then((response) => response.json());

            if (response.message === "Unauthorized access") {
              dispatch(logoutUser({ loggedIn: false }));
              dispatch(emptyCart());
              throw new Error("Unauthorized access");
            } else if (response.id) {
              return response.id;
            } else {
              throw new Error("Image upload failed");
            }
          }

          return dish.imageId;
        })
      );
      const updatedDishes = dishes.map(({ base64Image, ...dish }, index) => {
        if (uploadedImages[index]) {
          return { ...dish, imageId: uploadedImages[index] };
        }
        return dish;
      });
      const response = await postRequest({
        currentRoute: "/seller/sellerAddingDishes",
        method: "POST",
        headers: { "Content-Type": "application/json", authorization: token },
        body: {
          dishesData: updatedDishes,
        },
      });

      if (response.error) {
        enqueueSnackbar(response.error, { variant: "error" });
      } else {
        enqueueSnackbar(response.statusText, { variant: "success" });
      }
    } catch (error) {
      console.error("Error submitting dishes:", error.message);
      enqueueSnackbar("Error submitting dishes", { variant: "error" });
    }
  };

  const addNewDish = () => {
    setDishes([
      ...dishes,
      {
        categoryName: "",
        name: "",
        description: "",
        price: "",
        isVeg: false,
        imageFile: "",
      },
    ]);
    setDisableAddButton(true);
  };
  useEffect(() => {
    // Check if any field in any dish is empty
    const isAnyFieldEmpty = dishes.some(
      (dish) =>
        !dish.categoryName ||
        !dish.name ||
        !dish.description ||
        !dish.price ||
        !(dish.imageFile || dish.imageId)
    );
    setDisableAddButton(isAnyFieldEmpty);
  }, [dishes]);
  useEffect(() => {
    async function fetchData() {
      const data = await postRequest({
        currentRoute: "/seller/checkIsSeller",
        method: "POST",
        headers: { "Content-Type": "application/json", authorization: token },
        body: {},
      });
      if (data?.message === "Unauthorized access") {
        dispatch(logoutUser({ loggedIn: false }));
        dispatch(emptyCart());
      } else if (Array.isArray(data.dishes) && data.dishes.length > 0) {
        setDishes(
          data.dishes.map(({ isVeg, ...rest }) => ({ ...rest, isVeg: !!isVeg }))
        );
      }
    }
    fetchData();
  }, []);
  return (
    <Grid container spacing={2} justifyContent={"center"}>
      <Grid item xs={12}>
        <Typography variant="h6" color={"primary"}>
          Let's Begin Dish registration
        </Typography>
      </Grid>
      {dishes.map((dish, index) => (
        <Grid item xs={12} key={index}>
          <Grid
            container
            spacing={2}
            justifyContent={"center"}
            alignItems={"center"}
          >
            <Grid item xs={11}>
              <Typography variant="subtitle1" color={"primary"}>
                Dish {index + 1}
              </Typography>
            </Grid>
            <Grid item xs={11}>
              <Grid
                container
                alignItems={"center"}
                spacing={2}
                justifyContent={"center"}
              >
                <Grid item xs={6}>
                  <TextField
                    fullWidth
                    label="Category Name"
                    name="categoryName"
                    value={dish.categoryName}
                    onChange={(e) => handleDishChange(index, e)}
                    required
                    error={!!errors[`categoryName-${index}`]}
                    helperText={errors[`categoryName-${index}`]}
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    fullWidth
                    label="Dish Name"
                    name="name"
                    value={dish.name}
                    onChange={(e) => handleDishChange(index, e)}
                    required
                    error={!!errors[`name-${index}`]}
                    helperText={errors[`name-${index}`]}
                  />
                </Grid>

                <Grid item xs={6}>
                  <TextField
                    fullWidth
                    label="Price"
                    name="price"
                    value={dish.price}
                    onChange={(e) => handleDishChange(index, e)}
                    required
                    error={!!errors[`price-${index}`]}
                    helperText={errors[`price-${index}`]}
                  />
                </Grid>
                <Grid item xs={6}>
                  <FormControl fullWidth required>
                    <InputLabel id={`isVeg-label-${index}`}>Is Veg</InputLabel>
                    <Select
                      labelId={`isVeg-label-${index}`}
                      name="isVeg"
                      label="Is Veg"
                      value={dish.isVeg}
                      onChange={(e) => handleDishChange(index, e)}
                    >
                      <MenuItem value={true}>Yes</MenuItem>
                      <MenuItem value={false}>No</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Description"
                    name="description"
                    value={dish.description}
                    onChange={(e) => handleDishChange(index, e)}
                    required
                    error={!!errors[`description-${index}`]}
                    helperText={errors[`description-${index}`]}
                  />
                </Grid>
                <Grid item>
                  <ImageContainer
                    label={"Dish Image *"}
                    base64Image={dish.base64Image}
                    onChange={(e) => handleImageChange(index, e)}
                    error={!!errors[`imageFile-${index}`]}
                    helperText={errors[`imageFile-${index}`]}
                  />
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      ))}
      <Grid item xs={12}>
        <Grid container justifyContent={"center"} alignItems={"center"}>
          <Grid item>
            <Button
              variant="contained"
              onClick={addNewDish}
              disabled={disableAddButton}
            >
              Add New Dish
            </Button>
          </Grid>
        </Grid>
      </Grid>
      <Grid item xs={12}>
        <Grid container justifyContent={"center"} alignItems={"center"}>
          <Grid item>
            <Button variant="contained" onClick={handleDishRegistrationSubmit}>
              Submit
            </Button>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default DishesRegistration;
