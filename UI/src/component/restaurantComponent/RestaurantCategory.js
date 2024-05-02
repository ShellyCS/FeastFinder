/* eslint-disable jsx-a11y/alt-text */
import React, { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import { IMG_CDN_URL } from "../body/config";
import { useDispatch, useSelector } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  addItems,
  removeItem,
  updateItem,
} from "../../utils/slices/cartsSlice";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import RemoveCircleIcon from "@mui/icons-material/RemoveCircle";
const Section = ({ info }) => {
  const dispatch = useDispatch();
  const items = useSelector((state) => state.cart.items);

  const handleRemoveItem = (item) => {
    toast.info("Item removed in the cart!");
    const itemExist =
      (items || []).find(
        ({ restaurantId, dishId }) =>
          restaurantId === item.restaurantId && dishId === item.dishId
      ) || {};
    if (itemExist.count > 1) {
      dispatch(updateItem({ ...item, count: itemExist.count - 1 }));
    } else {
      dispatch(removeItem(item));
    }
  };
  const handleAddItem = (item) => {
    toast.info("🎉Item added in the cart!");
    const itemExist =
      (items || []).find(
        ({ restaurantId, dishId }) =>
          restaurantId === item.restaurantId && dishId === item.dishId
      ) || {};
    if (itemExist.restaurantId) {
      dispatch(updateItem({ ...item, count: itemExist.count + 1 }));
    } else {
      dispatch(addItems({ ...item, count: 1 }));
    }
  };

  return (
    <div className="w-full mt-4">
      <div className="flex flex-col text-left">
        <ToastContainer autoClose={1000} />
        {info.itemCards.map((item, index) => {
          const itemCount = (
            (items || []).find(
              ({ restaurantId, dishId }) =>
                restaurantId === item?.restaurantId && dishId === item?.dishId
            ) || {}
          ).count;
          const AddText = itemCount > 0 ? itemCount : "ADD";
          const card = item;
          return (
            <div
              key={index}
              className="text-gray-600 flex flex-col md:flex-row gap-4 border-b-[1px] border-gray-600 py-2 px-6"
            >
              <div className="flex flex-col w-3/4">
                <h1 className="font-semibold tracking-wide text-md">
                  {card.name}{" "}
                  <span className="text-xs font-normal">
                    {card.price ? "$" + card.price / 100 : "$ 15.0"}
                  </span>
                </h1>
                <p className="font-normal text-xs tracking-wide text-gray-400 mt-2">
                  {card.description}
                </p>
              </div>
              <Grid container justifyContent={"flex-end"}>
                <Grid item>
                  <Grid
                    container
                    justifyContent={"center"}
                    alignItems={"center"}
                    flexDirection={"column"}
                  >
                    <Grid item>
                      {card?.base64Image ? (
                        <img
                          className="relative z-0  h-20 object-fill"
                          alt="restaurant img"
                          src={`data:image/jpeg;base64,${card?.base64Image}`}
                        />
                      ) : (
                        <img
                          src={IMG_CDN_URL + card.imageId}
                          className="relative z-0  h-20 object-fill"
                        />
                      )}
                    </Grid>

                    <Grid item>
                      <Grid
                        container
                        alignItems="center"
                        justifyContent={"center"}
                        spacing={1}
                      >
                        <Grid item onClick={() => handleRemoveItem(item)}>
                          <RemoveCircleIcon
                            variant="contained"
                            color="secondary"
                          />
                        </Grid>

                        <Grid item>
                          <Grid
                            container
                            justifyContent={"center"}
                            alignItems={"center"}
                          >
                            <Grid item>{AddText}</Grid>
                          </Grid>
                        </Grid>
                        <Grid item onClick={() => handleAddItem(item)}>
                          <AddCircleIcon
                            variant="contained"
                            color="secondary"
                          />
                        </Grid>
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </div>
          );
        })}
      </div>
    </div>
  );
};

const RestaurantCategory = ({ data, isVisible, setIsVisible }) => {
  return (
    <div className=" shadow-lg rounded-lg flex flex-col items-start p-4">
      {/* Header */}

      <div className="flex justify-between w-full">
        <h1 className="font-medium text-lg">
          {data.title} ({data.itemCards.length})
        </h1>
        <button
          onClick={() => {
            isVisible == data.title
              ? setIsVisible("")
              : setIsVisible(data.title);
          }}
          className=""
        >
          {isVisible == data.title ? <ChevronUp /> : <ChevronDown />}
        </button>
      </div>

      {isVisible == data.title ? <Section info={data} /> : null}
    </div>
  );
};
export default RestaurantCategory;
