import { createSlice } from "@reduxjs/toolkit";

const cartsSlice = createSlice({
  name: "cart",
  initialState: {
    items: [],
  },
  reducers: {
    addItems: (state, action) => {
      state.items.push(action.payload);
    },
    removeItem: (state, action) => {
      const currentDishId = action.payload.dishId;
      const currentRestaurantId = action.payload.restaurantId;
      const index = state.items.findIndex(
        ({ restaurantId, dishId }) =>
          dishId === currentDishId && currentRestaurantId === restaurantId
      );
      state.items.splice(index, 1);
    },
    updateItem: (state, action) => {
      const currentDishId = action.payload.dishId;
      const currentRestaurantId = action.payload.restaurantId;
      const initialItems = (state.items || [])
        .map((item) => {
          if (
            item.dishId === currentDishId &&
            currentRestaurantId === item.restaurantId
          ) {
            return null;
          } else {
            return item;
          }
        })
        .filter((x) => !!x);
      console.log({ initialItems });
      const finalValues = initialItems.concat([action.payload]);
      state.items = finalValues;
    },
    emptyCart: (state) => {
      state.items.length = 0;
    },
  },
});

export const { addItems, removeItem, emptyCart, updateItem } =
  cartsSlice.actions;

export default cartsSlice.reducer;
