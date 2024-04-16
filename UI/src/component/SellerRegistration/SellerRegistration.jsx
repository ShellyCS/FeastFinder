import { useState } from "react";
import { Button, Grid, TextField, Typography } from "@mui/material";
import DishesData from "./DishesData";
import Restaurant from "./Restaurant";

const SellerRegistration = () => {
  const handleSubmit = () => {};

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
        <Restaurant />
      </Grid>
      <Grid item xs={12} sm={11} md={11}>
        <DishesData />
      </Grid>
      <Grid item xs={12}>
        <Grid container justifyContent={"center"} alignItems={"center"}>
          <Grid item>
            <Button variant="contained" color="primary" onClick={handleSubmit}>
              Submit
            </Button>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default SellerRegistration;
