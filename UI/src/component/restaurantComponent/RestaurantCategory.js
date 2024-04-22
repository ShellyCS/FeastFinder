/* eslint-disable jsx-a11y/alt-text */
import React, { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import { IMG_CDN_URL } from "../body/config";
import { useDispatch } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { addItems } from "../../utils/slices/cartsSlice";

const Section = ({ info }) => {
  const dispatch = useDispatch();

  const handleAddItem = (item) => {
    toast.info("🎉Item added in the cart!");
    dispatch(addItems(item));
  };

  return (
    <div className=" mt-4">
      <div className="flex flex-col text-left">
        <ToastContainer autoClose={1000} />
        {info.itemCards.map((item, index) => {
          const card = item;
          return (
            <div
              key={index}
              className="text-gray-600 flex flex-col md:flex-row gap-4 border-b-[1px] border-gray-600 py-2 px-6"
            >
              <div className="flex flex-col w-3/4">
                <h1 className="font-semibold tracking-wide text-md">
                  {card.name}{" "}
                  <span className="text-xs font-normal">
                    {card.price ? "$" + card.price / 1000 : "$ 15.0"}
                  </span>
                </h1>
                <p className="font-normal text-xs tracking-wide text-gray-400 mt-2">
                  {card.description}
                </p>
              </div>

              <div className="relative 1/4">
                <img
                  src={IMG_CDN_URL + card.imageId}
                  className="relative z-0  h-20 object-fill"
                />
                <button
                  className="absolute z-10 top-14 translate-x-[70%] bg-white px-3 py-2 
              text-xs font-medium shadow-md  rounded-md "
                  onClick={() => handleAddItem(item)}
                >
                  ADD
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

const RestaurantCategory = ({ data, isVisible, setIsVisible }) => {
  return (
    <div className=" shadow-lg rounded-lg flex flex-col items-start p-4">
      {/* Header */}

      <div className="flex justify-between w-full">
        <h1 className="font-medium text-lg">
          {data.title} ({data.itemCards.length})
        </h1>
        <button
          onClick={() => {
            isVisible == data.title
              ? setIsVisible("")
              : setIsVisible(data.title);
          }}
          className=""
        >
          {isVisible == data.title ? <ChevronUp /> : <ChevronDown />}
        </button>
      </div>

      {isVisible == data.title ? <Section info={data} /> : null}
    </div>
  );
};
export default RestaurantCategory;
