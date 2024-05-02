import { useEffect, useState } from "react";
import { Button, Grid, Tab, Tabs, Box } from "@mui/material";
import Dishes from "./DishesRegistration";
import Restaurant from "./Restaurant";
import { postRequest } from "../../api";
import { useSelector, useDispatch } from "react-redux";
import TabPanel from "./TabPanel";
import { logoutUser } from "../../utils/slices/UserSlice";
import { emptyCart } from "../../utils/slices/cartsSlice";

const SellerRegistration = () => {
  const dispatch = useDispatch();

  const [tabValue, setTabValue] = useState(0);
  const token = useSelector((state) => state.user.token);
  const [disableDishes, setDisableDishes] = useState(false);
  const handleChangeTab = (event, newValue) => {
    if (newValue === 1) {
      setDisableDishes(false);
    }
    setTabValue(newValue);
  };
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
      } else if (
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
          setDisableDishes(false);
        } else {
          setDisableDishes(true);
        }
      } else {
        setDisableDishes(true);
      }
    }
    fetchData();
  }, []);
  return (
    <Grid
      container
      spacing={2}
      alignItems={"center"}
      justifyContent={"center"}
      style={{
        marginTop: "6px",
      }}
    >
      <Grid item xs={12} sm={11} md={11}>
        <Tabs value={tabValue} onChange={handleChangeTab}>
          <Tab label="Restaurants" />
          <Tab label="Dishes" disabled={disableDishes} />
        </Tabs>
        <TabPanel value={tabValue} index={0}>
          <Restaurant handleChangeTab={handleChangeTab} />
        </TabPanel>
        <TabPanel value={tabValue} index={1}>
          <Dishes />
        </TabPanel>
      </Grid>
    </Grid>
  );
};

export default SellerRegistration;
