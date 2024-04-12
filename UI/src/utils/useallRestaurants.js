import { useState, useEffect } from "react";
import { FETCH_RESTAURANTS_URL } from "../component/body/config";

function useAllRestaurant(setfilteredRestaurants) {
  const [allRestaurants, setallRestaurants] = useState([]);

  useEffect(() => {
    getRestaurants();
  }, []);

  async function getRestaurants() {
    try {
      //   const data = await fetch(
      //     "https://www.swiggy.com/dapi/restaurants/list/v5?lat=12.9351929&lng=77.62448069999999&page_type=DESKTOP_WEB_LISTING"
      //   );
      //   const json = await data.json();

      //   console.log("0000");
      //   console.log(json);
      //   console.log(
      //     json?.data?.cards[4]?.card?.card?.gridElements?.infoWithStyle
      //       ?.restaurants
      //   );
      //   console.log(
      //     json?.data?.cards[4]?.card?.card?.gridElements?.infoWithStyle
      //       ?.restaurants
      //   );
      //   setallRestaurants(
      //     json?.data?.cards[4]?.card?.card?.gridElements?.infoWithStyle
      //       ?.restaurants
      //   );
      //   setfilteredRestaurants(
      //     json?.data?.cards[4]?.card?.card?.gridElements?.infoWithStyle
      //       ?.restaurants
      //   );

      // added a mapper func
      const data = await fetch("http://localhost:8081/restaurants");
      const json = await data.json();
      const mappedData = json.map((item) => ({
        info: {
          id: item.id.toString(),
          name: item.name,
          cloudinaryImageId: item.restaurant_image,
          areaName: item.areaName,
          costForTwo: "₹250 for two",
          cuisines: [],
          avgRating: item.avgRating,
          parentId: "",
          avgRatingString: item.avgRating.toString(),
          totalRatingsString: "",
          sla: {
            deliveryTime: item.deliveryTime,
            lastMileTravel: 0,
            serviceability: "",
            slaString: "",
            lastMileTravelString: "",
            iconType: "ICON_TYPE_EMPTY",
          },
          availability: {
            nextCloseTime: "",
            opened: true,
          },
          badges: {},
          isOpen: true,
          type: "F",
          badgesV2: {
            entityBadges: {
              imageBased: {},
              textBased: {},
              textExtendedBadges: {},
            },
          },
          aggregatedDiscountInfoV3: {
            header: "ITEMS",
            subHeader: "AT ₹179",
          },
          orderabilityCommunication: {
            title: {},
            subTitle: {},
            message: {},
            customIcon: {},
          },
          differentiatedUi: {
            displayType: "ADS_UI_DISPLAY_TYPE_ENUM_DEFAULT",
            differentiatedUiMediaDetails: {
              mediaType: "ADS_MEDIA_ENUM_IMAGE",
              lottie: {},
              video: {},
            },
          },
          reviewsSummary: {},
          displayType: "RESTAURANT_DISPLAY_TYPE_DEFAULT",
          restaurantOfferPresentationInfo: {},
        },
      }));
      setallRestaurants(mappedData);
      setfilteredRestaurants(mappedData);
    } catch (error) {
      console.error("Error fetching restaurants:", error);
      setallRestaurants(undefined);
    }
  }
  return allRestaurants;
}
export default useAllRestaurant;
