import React, { lazy, Suspense } from "react";
import App from "./App";
import ReactDOM from "react-dom/client";
import "./index.css";
import { Provider } from "react-redux";
import appStore from "./utils/appStore";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <Provider store={appStore}>
    <App />
  </Provider>
);
