// import { configureStore } from "@reduxjs/toolkit";
// import cartReducer from "../ReduxSlice/cartSlice";
// import themeReducer from "./themeSlice";
// import userReducer from "./UserSlice";
// const appStore = configureStore({
//   reducer: {
//     cart: cartReducer,
//     theme: themeReducer,
//     user: userReducer,
//   },
// });

import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./slices/cartsSlice";
import userReducer from "./slices/UserSlice";

const appStore = configureStore({
  reducer: {
    cart: cartReducer,
    user: userReducer,
  },
});

export default appStore;
