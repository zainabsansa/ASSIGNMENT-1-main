// require('dotenv').config(); since you used process.env, you dont need to import dotenv again

// Helper function to generate JWT token
const jwt = require("jsonwebtoken");
const generateToken = (userId) => {
  return jwt.sign({ id: userId }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });
};
module.exports = generateToken;