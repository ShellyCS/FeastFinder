import React from "react";
import Rating from "@mui/material/Rating";

const StarRating = ({ value, onChange }) => {
  return (
    <Rating
      name="avgRating"
      value={value}
      precision={0.5}
      onChange={(event, newValue) => {
        onChange({ target: { name: "avgRating", value: newValue } });
      }}
    />
  );
};

export default StarRating;
