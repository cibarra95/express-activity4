const jwt = require("jsonwebtoken");

const generateToken = (userId) => {
  const payload = { id: userId }; // Payload with user information
  const secret = process.env.JWT_SECRET || "your_jwt_secret"; // Secret key for signing
  const options = { expiresIn: "1h" }; // Token expiration (optional)

  return jwt.sign(payload, secret, options);
};

module.exports = { generateToken };