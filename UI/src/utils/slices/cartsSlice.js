import { createSlice } from "@reduxjs/toolkit";

const loadCartFromStorage = () => {
  try {
    const cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];
    return cartItems;
  } catch (error) {
    console.error("Error loading cart from localStorage:", error);
    return [];
  }
};

const cartsSlice = createSlice({
  name: "cart",
  initialState: {
    items: loadCartFromStorage(),
  },
  reducers: {
    addItems: (state, action) => {
      state.items.push(action.payload);
      localStorage.setItem(
        "cartItems",
        JSON.stringify(
          state.items.map(({ base64Image, ...dish }) => ({ ...dish }))
        )
      );
    },
    removeItem: (state, action) => {
      const currentDishId = action.payload.dishId;
      const currentRestaurantId = action.payload.restaurantId;
      const index = state.items.findIndex(
        ({ restaurantId, dishId }) =>
          dishId === currentDishId && currentRestaurantId === restaurantId
      );
      state.items.splice(index, 1);
      localStorage.setItem(
        "cartItems",
        JSON.stringify(
          state.items.map(({ base64Image, ...dish }) => ({ ...dish }))
        )
      );
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
      localStorage.setItem(
        "cartItems",
        JSON.stringify(
          state.items.map(({ base64Image, ...dish }) => ({ ...dish }))
        )
      );
    },
    emptyCart: (state) => {
      state.items.length = 0;
      localStorage.removeItem("cartItems");
    },
  },
});

export const { addItems, removeItem, emptyCart, updateItem } =
  cartsSlice.actions;

export default cartsSlice.reducer;
