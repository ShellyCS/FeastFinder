import React from "react";
import "./Header.css";

const Header = ({ scrollToSearch }) => {
  return (
    <div className="header">
      <div className="header-contents">
        <h2>
          Order your <br /> favorite food here
        </h2>
        <p>
          Choose from diverse menu featuring a delectable array of dishes
          crafted with the finest ingredients and culinery expertise. Our
          mission is to satisfy your cravings and elevate your dining
          experience, one delicious meal at a time.
        </p>
        <button onClick={scrollToSearch}> View Restaurants</button>
      </div>
    </div>
  );
};

export default Header;
