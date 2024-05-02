const express = require("express");
const router = express.Router();
const db = require("../database/db");
const verifyToken = require("./verification");

router.post("/createOrder", verifyToken, async (req, res) => {
  try {
    const userId = req.user?.userId;
    const { cartItems } = req.body;

    if (!userId) {
      return res.status(400).json({ error: "Login required." });
    }

    if (!Array.isArray(cartItems) || cartItems.length === 0) {
      return res.status(400).json({ error: "Cart items are required." });
    }

    const orderDate = new Date().toISOString().slice(0, 19).replace("T", " ");

    const [result] = await db.query(
      "INSERT INTO Orders (userId, orderDate) VALUES (?, ?)",
      [userId, orderDate]
    );

    const orderId = result.insertId;

    // Inserting cart items into the OrderDetails table
    for (const item of cartItems) {
      await db.query(
        "INSERT INTO OrderDetails (orderId, dishId, restaurantId, name, description, price, isVeg, imageId, categoryName, count) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
        [
          orderId,
          item.dishId,
          item.restaurantId,
          item.name,
          item.description,
          item.price,
          item.isVeg,
          item.imageId,
          item.categoryName,
          item.count,
        ]
      );
    }

    res.status(200).json({
      statusText: "Order created successfully!",
      orderId: orderId,
    });
  } catch (error) {
    console.error("Error creating order:", error);
    res.status(500).json({ error: "Internal server error!" });
  }
});

router.get("/myOrders", verifyToken, async (req, res) => {
  try {
    const userId = req.user.userId;
    console.log({ userId });
    if (!userId) {
      return res.status(400).json({ error: "Login Required." });
    }

    const [orders] = await db.query("SELECT * FROM Orders WHERE userId = ?", [
      userId,
    ]);

    // Fetch order details for each order
    for (const order of orders) {
      const [orderDetails] = await db.query(
        "SELECT * FROM OrderDetails WHERE orderId = ?",
        [order.orderId]
      );
      console.log({ order, orderDetails });
      order.details = orderDetails;
    }
    console.log({ orders });
    res.status(200).json({ orders });
  } catch (error) {
    console.error("Error fetching orders:", error);
    res.status(500).json({ error: "Internal server error!" });
  }
});

module.exports = router;
