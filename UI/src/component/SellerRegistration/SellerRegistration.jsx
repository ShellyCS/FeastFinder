import { useEffect, useState } from "react";
import { Button, Grid, Tab, Tabs, Box } from "@mui/material";
import Dishes from "./DishesData";
import Restaurant from "./Restaurant";
import { postRequest } from "../../api";
import { useSelector } from "react-redux";
import TabPanel from "./TabPanel";

const SellerRegistration = () => {
  const [tabValue, setTabValue] = useState(0);
  const token = useSelector((state) => state.user.token);
  const handleChangeTab = (event, newValue) => {
    setTabValue(newValue);
  };

  const handleSubmit = () => {
    // Handle form submission
  };

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
          <Tab label="Dishes" />
        </Tabs>
        <TabPanel value={tabValue} index={0}>
          <Restaurant />
        </TabPanel>
        <TabPanel value={tabValue} index={1}>
          <Dishes />
        </TabPanel>
      </Grid>
    </Grid>
  );
};

export default SellerRegistration;
