const express = require("express");
const authController = require("../Controllers/authController");
const { signupRateLimiter, loginRateLimiter } = require("../Middlewares/rate-limit");
const authRouter = express.Router();

authRouter.post("/signUp", signupRateLimiter, authController.signUp);
authRouter.post("/logIn", loginRateLimiter, authController.logIn);

module.exports = authRouter;