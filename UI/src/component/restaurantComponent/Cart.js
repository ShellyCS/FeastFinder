/* eslint-disable jsx-a11y/img-redundant-alt */
import { useSelector, useDispatch } from "react-redux";
import { IMG_CDN_URL } from "../body/config";
import { useEffect, useState } from "react";
import { emptyCart, removeItem } from "../../utils/slices/cartsSlice";
import { useNavigate, useParams } from "react-router-dom";
import { useSnackbar } from "notistack";
import { Button, Grid } from "@mui/material";
import { postRequest } from "../../api";
import { logoutUser } from "../../utils/slices/UserSlice";

const Cart = () => {
  const { enqueueSnackbar } = useSnackbar();
  const cartItems = useSelector((state) => state.cart.items);
  const dispatch = useDispatch();
  const [price, setPrice] = useState(0);
  const navigate = useNavigate();
  const token = useSelector((state) => state.user.token);

  useEffect(() => {
    let price = 0;
    cartItems.forEach((item) => {
      if (item.price) {
        let p = +(item.price / 100) * item.count;
        price += p;
      }
    });
    setPrice(price);
  }, [cartItems]);

  const clearCart = () => {
    dispatch(emptyCart());
  };

  const removeCartOrders = (item) => {
    dispatch(removeItem(item));
  };

  const backfunc = () => {
    navigate(-1);
  };

  const handleBuyNow = async () => {
    console.log({ cartItems });
    if (!token) {
      enqueueSnackbar(`Please Login `, {
        variant: "error",
      });
      navigate("/login");
      return;
    } else {
      const response = await postRequest({
        currentRoute: "/orders/createOrder",
        method: "POST",
        headers: { "Content-Type": "application/json", authorization: token },
        body: {
          cartItems: cartItems.map(({ base64Image, ...dish }) => ({ ...dish })),
        },
      });
      console.log({ response });
      if (response.error) {
        enqueueSnackbar(response.error, { variant: "error" });
      } else if (response?.message === "Unauthorized access") {
        enqueueSnackbar("Please Login ", {
          variant: "error",
        });
        dispatch(logoutUser({ loggedIn: false }));
        dispatch(emptyCart());
      } else {
        enqueueSnackbar(response.statusText, { variant: "success" });
        dispatch(emptyCart());
        navigate("/myOrders");
      }
    }
  };

  return (
    <div className="w-[80%] mx-auto h-screen">
      <button
        className="text-white bg-orange-500 px-4 py-2 rounded-lg hover:bg-orange-600"
        onClick={backfunc}
      >
        Back
      </button>
      {cartItems.length === 0 ? (
        <h1 className="text-center text-2xl font-semibold mt-4">
          Cart is Empty
        </h1>
      ) : (
        <div className="container mx-auto px-4 py-8">
          <div className="flex flex-col md:flex-row md:justify-between md:items-center">
            <h1 className="text-2xl font-bold my-4">Shopping Cart</h1>
            <button
              className="text-white bg-orange-500 py-2 px-4 rounded-lg hover:bg-orange-600"
              onClick={() => clearCart()}
            >
              Clear Cart
            </button>
          </div>
          <div className="mt-8">
            {cartItems.map((item) => (
              <div className="flex flex-col md:flex-row border-b border-gray-400 py-4">
                <div className="flex-shrink-0">
                  {item?.base64Image ? (
                    <img
                      className="w-32 h-32 object-cover"
                      alt="Product image"
                      src={`data:image/jpeg;base64,${item?.base64Image}`}
                    />
                  ) : (
                    <img
                      src={IMG_CDN_URL + item.imageId}
                      alt="Product image"
                      className="w-32 h-32 object-cover"
                    />
                  )}
                </div>
                <div className="mt-4 md:mt-0 md:ml-6">
                  <h2 className="text-lg font-bold">{item.name}</h2>
                  <p className="mt-2 text-gray-600">{item.categoryName}</p>
                  <div className="mt-4 flex items-center">
                    <span className="mr-2 text-gray-600">
                      Quantity: {item.count}
                    </span>
                    <div className="flex items-center px-2">
                      <button
                        className="bg-gray-200 rounded-l-lg px-2 py-1"
                        onClick={() => removeCartOrders(item)}
                      >
                        Remove
                      </button>
                      {/* <span className="mx-2 text-gray-600">1</span>
                      <button className="bg-gray-200 rounded-r-lg px-2 py-1">
                        +
                      </button> */}
                    </div>
                    {item.price ? (
                      <span className="ml-auto font-bold">
                        $ {item.price / 100}
                      </span>
                    ) : (
                      <span className="ml-auto font-bold">
                        $ {item.price / 100}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="flex justify-end items-center mt-8">
            <span className="text-gray-600 mr-4">Subtotal:</span>
            <span className="text-xl font-bold">
              $ {(Math.round(price * 100) / 100).toFixed(2)}
            </span>
          </div>
          <Grid container justifyContent={"flex-end"}>
            <Grid item>
              <Button
                color="primary"
                variant="contained"
                onClick={handleBuyNow}
              >
                Buy Now
              </Button>
            </Grid>
          </Grid>
        </div>
      )}
    </div>
  );
};

export default Cart;
