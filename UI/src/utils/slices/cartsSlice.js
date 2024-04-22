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
      const id = action.payload.dishId;
      const index = state.items.findIndex((o) => o.dishId === id);
      state.items.splice(index, 1);
    },
    emptyCart: (state) => {
      state.items.length = 0;
    },
  },
});

export const { addItems, removeItem, emptyCart } = cartsSlice.actions;

export default cartsSlice.reducer;
