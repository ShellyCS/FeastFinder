import React, { useState } from "react";
import RestaurantCard, { withPromotedLabel } from "./Cardlist";
import Shimmer from "./Shimmer";
import { Link } from "react-router-dom";
import { filterData } from "../../utils/helper";
import useAllRestaurant from "../../utils/useallRestaurants";
import useOnline from "../../utils/useOnline";

const Body = () => {
  const [flteredRestaurants, setfilteredRestaurants] = useState([]);
  const [searchText, setsearchText] = useState("");
  const allRestaurants = useAllRestaurant(setfilteredRestaurants);
  const offline = useOnline();
  const PromotedRestaurantCard = withPromotedLabel(RestaurantCard);

  if (!allRestaurants) return <div>dum dum</div>;

  if (offline) {
    return <h1>Offline, please check your internet connection</h1>;
  }
  return allRestaurants.length === 0 ? (
    <Shimmer />
  ) : (
    <div className="w-full flex flex-col items-center min-h-screen">
      {/* <Restaurantdata/> */}
      {/* Search */}
      <div className="p-10 flex gap-4">
        <input
          type="text"
          placeholder="Search"
          value={searchText}
          onChange={(e) => setsearchText(e.target.value)}
          className="border-2 p-2 rounded-md"
        />
        <button
          className="text-white bg-orange-500 px-4 py-2 rounded-lg hover:bg-orange-600"
          onClick={() => {
            const data = filterData(searchText, allRestaurants);
            setfilteredRestaurants(data);
          }}
        >
          Search
        </button>
      </div>

      <div className="flex flex-wrap justify-center gap-6 py-10 ">
        {flteredRestaurants && flteredRestaurants.length === 0 ? (
          <h1>No Restaurant match your filter</h1>
        ) : (
          flteredRestaurants.map((restaurant, ind) => (
            <Link to={"/menu/" + restaurant.info.id} key={restaurant?.info.id}>
              {/* if restaurant is promoted then add a promoted label to it */}
              {restaurant?.info.promoted ? (
                <PromotedRestaurantCard
                  {...restaurant.info}
                  key={restaurant.info.id}
                />
              ) : (
                <RestaurantCard {...restaurant.info} />
              )}
            </Link>
          ))
        )}
      </div>
    </div>
  );
};

export default Body;
