const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const db = require("../database/db");

const JWTSECRET = process.env.JWTSECRET || "restaurantmanagement";

const hashPassword = async (password) => {
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);
  return hashedPassword;
};

router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res
      .status(400)
      .json({ error: "Please fill in all required fields" });
  }
  try {
    const [results] = await db.query("SELECT * FROM users WHERE email = ?", [
      email,
    ]);
    if (results[0]?.Email !== email) {
      return res.status(401).json({ error: "Email Doesn't Exist" });
    }

    const user = results[0];
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return res.status(401).json({ error: "Invalid email or password" });
    }
    const payload = {
      userId: user.id,
      email: user.email,
    };
    const options = {
      expiresIn: "1h",
    };

    const token = jwt.sign(payload, JWTSECRET, options);
    res.json({
      token,
      firstName: user.FirstName,
      lastName: user.LastName,
      email: user.Email,
    });
  } catch (error) {
    console.error("Error logging in user:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

router.post("/signup", async (req, res) => {
  const { firstName, lastName, email, password } = req.body;
  if (!firstName || !lastName || !email || !password) {
    return res
      .status(400)
      .json({ error: "Please fill in all required fields" });
  }
  try {
    const existingUser = (
      await db.query("SELECT * FROM users WHERE email = ?", [email])
    ).filter((item) => !item);
    if (existingUser.length > 1) {
      return res.status(409).json({ error: "Email address already in use" });
    }
    const hashedPassword = await hashPassword(password);

    const [results] = await db.query(
      "INSERT INTO users (firstName, lastName, email, password) VALUES (?, ?, ?, ?)",
      [firstName, lastName, email, hashedPassword]
    );

    res.status(201).json({ message: "User created successfully!" });
  } catch (error) {
    console.error("Error creating user:", error);
    res.status(500).json({ error: error.message || "Internal server error" });
  }
});

module.exports = router;
