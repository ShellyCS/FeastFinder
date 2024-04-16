const mysql = require("mysql2/promise");
require("dotenv").config();

const db = mysql.createPool({
  host: process.env.HOST || "localhost",
  user: process.env.USER || "root",
  password: process.env.PASSWORD || "1234",
  database: process.env.DATABASE || "food_db",
});

module.exports = db;
