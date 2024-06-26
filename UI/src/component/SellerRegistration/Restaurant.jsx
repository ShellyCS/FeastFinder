import { useState, useEffect } from "react";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import ImageContainer from "./ImageContainer";
import { mainRoute, postRequest } from "../../api";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { useSnackbar } from "notistack";
import { logoutUser } from "../../utils/slices/UserSlice";
import { emptyCart } from "../../utils/slices/cartsSlice";
const Restaurant = ({ handleChangeTab }) => {
  const { enqueueSnackbar } = useSnackbar();
  const dispatch = useDispatch();

  const [restaurant, setRestaurant] = useState({
    name: "",
    areaName: "",
    restaurant_image: "",
    city: "",
    imageFile: "",
  });
  const [errors, setErrors] = useState({});
  const token = useSelector((state) => state.user.token);
  const handleRestaurantChange = (e) => {
    const { name, value } = e.target;
    setRestaurant((prev) => ({ ...prev, [name]: value }));
  };
  const handleImageChange = (event) => {
    if (event.file) {
      setRestaurant((prev) => ({ ...prev, imageFile: event.file }));
    } else {
      setRestaurant((prev) => ({
        ...prev,
        imageFile: "",
        restaurant_image: "",
      }));
    }
  };
  const handleRestaurantInfoSubmit = async (event) => {
    event.preventDefault();
    const validationErrors = {};
    if (!restaurant.name) validationErrors.name = "Name is required";
    if (!restaurant.areaName) validationErrors.areaName = "Address is required";
    if (!restaurant.city) validationErrors.city = "City is required";
    if (!restaurant.imageFile && !restaurant.restaurant_image)
      validationErrors.imageFile = "Image is required";
    if (Object.keys(validationErrors).length > 0) {
      // Display validation errors
      setErrors(validationErrors);
      return;
    } else {
      setErrors(validationErrors);
    }

    try {
      let response = {};
      if (restaurant.imageFile) {
        const formData = new FormData();
        formData.append("imageData", restaurant.imageFile);
        response = await fetch(mainRoute + "/images/upload", {
          method: "POST",
          headers: {
            authorization: token,
          },
          body: formData,
        }).then((response) => {
          return response.json();
        });
      }
      if (
        response?.message === "Unauthorized access" &&
        !restaurant.restaurant_image
      ) {
        dispatch(logoutUser({ loggedIn: false }));
        dispatch(emptyCart());
      } else if (response.id || restaurant.restaurant_image) {
        if (response.message) {
          toast.info(response.message);
        }
        const uploadRestuarant_Info = await postRequest({
          currentRoute: "/seller/sellerOnBoarding",
          method: "POST",
          headers: { "Content-Type": "application/json", authorization: token },
          body: {
            name: restaurant.name,
            areaName: restaurant.areaName,
            restaurant_image: response.id || restaurant.restaurant_image,
            city: restaurant.city,
          },
        });
        if (uploadRestuarant_Info.error) {
          enqueueSnackbar(uploadRestuarant_Info.error, {
            variant: "error",
          });
        } else {
          enqueueSnackbar(uploadRestuarant_Info.statusText, {
            variant: "success",
          });
          handleChangeTab("", 1);
        }
      }
    } catch (error) {
      console.error("InternalError", error.message);
    }
  };
  useEffect(() => {
    async function fetchData() {
      const data = await postRequest({
        currentRoute: "/seller/checkIsSeller",
        method: "POST",
        headers: { "Content-Type": "application/json", authorization: token },
        body: {},
      });
      if (
        Array.isArray(data.restaurant) &&
        data.restaurant.length > 0 &&
        Array.isArray(data.restaurant_info) &&
        data.restaurant_info.length > 0
      ) {
        const finalRestaurantDetails = {
          ...(data.restaurant[0] || {}),
          ...(data.restaurant_info[0] || {}),
        };
        if (Object.keys(finalRestaurantDetails).length > 0) {
          finalRestaurantDetails.isAlreadyASeller = true;
        }
        setRestaurant({
          ...finalRestaurantDetails,
        });
      }
    }
    fetchData();
  }, []);
  return (
    <Grid container spacing={2} justifyContent={"center"}>
      <Grid item xs={12}>
        <Typography variant="h6" color={"primary"}>
          {!restaurant.isAlreadyASeller
            ? "Let's Begin Restaurant registration"
            : "Modify your restaurant"}
        </Typography>
      </Grid>
      <Grid item xs={11}>
        <Grid
          container
          alignItems={"center"}
          spacing={2}
          justifyContent={"center"}
        >
          <Grid item xs={4}>
            <TextField
              fullWidth
              label="Name"
              name="name"
              value={restaurant.name}
              onChange={handleRestaurantChange}
              error={!!errors.name}
              helperText={errors.name}
              required
            />
          </Grid>
          <Grid item xs={4}>
            <TextField
              fullWidth
              label="Address1"
              name="areaName"
              value={restaurant.areaName}
              onChange={handleRestaurantChange}
              error={!!errors.areaName}
              helperText={errors.areaName}
              required
            />
          </Grid>

          <Grid item xs={4}>
            <TextField
              fullWidth
              label="City"
              name="city"
              value={restaurant.city}
              onChange={handleRestaurantChange}
              error={!!errors.city}
              helperText={errors.city}
              required
            />
          </Grid>
          <Grid item>
            <ImageContainer
              label={"Restaurant Image *"}
              base64Image={restaurant.base64Image}
              onChange={handleImageChange}
              error={!!errors.imageFile}
              helperText={errors.imageFile}
            />
          </Grid>
        </Grid>
      </Grid>
      <Grid item>
        <Button variant="contained" onClick={handleRestaurantInfoSubmit}>
          Submit
        </Button>
      </Grid>
    </Grid>
  );
};

export default Restaurant;
