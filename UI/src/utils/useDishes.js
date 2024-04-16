const { useState, useEffect } = require("react");

const useDishes = (id) => {
  const [dishes, setDishes] = useState(null);

  useEffect(() => {
    getDishes();
  }, []);

  async function getDishes() {
    const data = await fetch("http://localhost:8081/dishes");
    const json = await data.json();
    console.log(json);
    setDishes(json);
  }

  return dishes;
};

export default useDishes;
