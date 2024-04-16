import { useState, useEffect } from "react";
import { FETCH_MENU_URL } from "../component/body/config";

const useRestaurant = (id) => {
  const [restaurant, setrestaurant] = useState(null);

  useEffect(() => {
    getRestaurantinfo();
  }, []);

  async function getRestaurantinfo() {
    // const data = await fetch(FETCH_MENU_URL + id);
    // console.log("data");
    // console.log(data);
    // const json = await data.json();
    // console.log("json");
    // console.log(json);
    // setrestaurant(json.data);

    const data = await fetch("http://localhost:8081/restaurant_info");
    const json = await data.json();
    console.log(json);
    setrestaurant(json);
  }

  return restaurant;
};

export default useRestaurant;
