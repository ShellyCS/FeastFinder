import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "../ReduxSlice/cartSlice";
import themeReducer from "./themeSlice";
import userReducer from "./UserSlice";
const appStore = configureStore({
  reducer: {
    cart: cartReducer,
    theme: themeReducer,
    user: userReducer,
  },
});

export default appStore;
