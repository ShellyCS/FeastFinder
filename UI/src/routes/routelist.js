import { lazy } from "react";
import Body from "../component/body/Body";
import Login from "../component/Login/Login";
import SignUp from "../component/SignUp/SignUp";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
const Cart = lazy(() => import("../component/restaurantComponent/Cart"));
const Menu = lazy(() =>
  import("../component/restaurantComponent/RestaurantMenu")
);
const Contact = lazy(() => import("../component/contact/Contact"));

const privateRouteList = [
  {
    path: "/cart",
    element: Cart,
    label: <ShoppingCartIcon />,
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
