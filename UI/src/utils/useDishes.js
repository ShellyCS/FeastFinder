const { useState, useEffect } = require("react");

const useDishes = (id) => {
  const [dishes, setDishes] = useState(null);

  useEffect(() => {
    getDishes();
  }, []);

  async function getDishes() {
    let arr = [];
    const data = await fetch("http://localhost:8081/dishes");
    const json = await data.json();
    console.log(json);
    json.filter((data) => {
      if (data.restaurantId === +id) {
        arr.push(data);
        setDishes(arr);
      }
    });
  }

  return dishes;
};

export default useDishes;
