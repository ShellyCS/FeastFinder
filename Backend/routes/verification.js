const jwt = require("jsonwebtoken");
const JWTSECRET = process.env.JWTSECRET || "restaurantmanagement";

function verifyToken(req, res, next) {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(403).json({ message: "Token is not provided" });
  }

  jwt.verify(token, JWTSECRET, (err, decoded) => {
    if (err) {
      return res.status(401).json({ message: "Unauthorized access" });
    } else {
      req.user = decoded;
      next();
    }
  });
}
module.exports = verifyToken;
