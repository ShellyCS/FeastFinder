import { lazy } from "react";
import Body from "../component/body/Body";
import Login from "../component/Login/Login";
import SignUp from "../component/SignUp/SignUp";
const Cart = lazy(() => import("../component/restaurantComponent/Cart"));
const SellerRegistration = lazy(() =>
  import("../component/SellerRegistration/SellerRegistration")
);
const Menu = lazy(() =>
  import("../component/restaurantComponent/RestaurantMenu")
);
const MyOrders = lazy(() => import("../component/MyOrders/MyOrders"));
const Contact = lazy(() => import("../component/contact/Contact"));

const privateRouteList = [
  {
    path: "/sellerregistration",
    element: SellerRegistration,
    label: "BeASeller",
  },
  {
    path: "/myOrders",
    element: MyOrders,
    label: "MyOrders",
  },
];

const commonRoutes = [
  {
    path: "/",
    element: Body,
    label: "Home",
  },
  {
    path: "/contact",
    element: Contact,
    label: "Contact",
  },
  {
    path: "/restaurantmenu/:id",
    element: Menu,
    label: "Menu",
    disableInNavbar: true,
  },
  {
    path: "/cart",
    element: Cart,
    label: "Cart",
  },
];

const publicRoutes = [
  {
    path: "/login",
    element: Login,
    label: "Login",
  },
  {
    path: "/signup",
    element: SignUp,
    label: "SignUp",
    disableInNavbar: true,
  },
];

export { commonRoutes, publicRoutes, privateRouteList };
