import { useState, useEffect } from "react";
import { FETCH_MENU_URL } from "../component/body/config";

const useRestaurant = (id) => {
  const [restaurant, setrestaurant] = useState(null);

  useEffect(() => {
    getRestaurantinfo();
  }, []);

  async function getRestaurantinfo() {
    try {
      const data = await fetch(FETCH_MENU_URL + id, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      });
      console.log("data");
      console.log(data);
      const json = await data.json();
      console.log("json");
      console.log(json);
      setrestaurant(json.data);
    } catch (error) {
      console.log({ error });
    }
  }

  return restaurant;
};

export default useRestaurant;
