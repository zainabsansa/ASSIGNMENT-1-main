const rateLimit = require('express-rate-limit');

// Rate limiter for login attempts
const loginRateLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5, // Limit each IP to 5 requests per `window` (here, per 15 minutes)
  message: "Too many login attempts from this IP, please try again later.",
});

// Rate limiter for sign-up attempts
const signupRateLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5, // Limit each IP to 5 requests per `window` (here, per 15 minutes)
  message: "Too many sign-up attempts from this IP, please try again later.",
});

module.exports = { loginRateLimiter, signupRateLimiter };
