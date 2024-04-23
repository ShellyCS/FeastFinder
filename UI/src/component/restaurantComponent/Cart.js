/* eslint-disable jsx-a11y/img-redundant-alt */
import { useSelector, useDispatch } from "react-redux";
import { IMG_CDN_URL } from "../body/config";
import { useEffect, useState } from "react";
import { emptyCart, removeItem } from "../../utils/slices/cartsSlice";
import { useNavigate, useParams } from "react-router-dom";

const Cart = () => {
  const cartItems = useSelector((state) => state.cart.items);
  const dispatch = useDispatch();
  const [price, setPrice] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    let price = 0;
    cartItems.forEach((item) => {
      if (item.price) {
        let p = +item.price / 100;
        price += p;
      }
    });
    setPrice(price);
  }, [cartItems]);

  console.log("cartItems");
  console.log(cartItems);

  const clearCart = () => {
    dispatch(emptyCart());
  };

  const removeCartOrders = (item) => {
    dispatch(removeItem(item));
  };

  const backfunc = () => {
    navigate(-1);
  };

  return (
    <div className="w-[80%] mx-auto h-screen">
      <button
        className="z-10 top-14 translate-x-[70%] bg-white px-3 py-2 text-md font-medium shadow-md rounded-md hover:bg-gray-100 border-transparent rounded"
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
              className="bg-indigo-500 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded"
              onClick={() => clearCart()}
            >
              Clear Cart
            </button>
          </div>
          <div className="mt-8">
            {cartItems.map((item) => (
              <div className="flex flex-col md:flex-row border-b border-gray-400 py-4">
                <div className="flex-shrink-0">
                  <img
                    src={IMG_CDN_URL + item.imageId}
                    alt="Product image"
                    className="w-32 h-32 object-cover"
                  />
                </div>
                <div className="mt-4 md:mt-0 md:ml-6">
                  <h2 className="text-lg font-bold">{item.name}</h2>
                  <p className="mt-2 text-gray-600">{item.categoryName}</p>
                  <div className="mt-4 flex items-center">
                    <span className="mr-2 text-gray-600">Quantity:</span>
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
            <span className="text-xl font-bold">$ {Math.round(price)}</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
