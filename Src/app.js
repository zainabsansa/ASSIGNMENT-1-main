const express = require("express");
const mongoose = require("mongoose");
const userRouter = require("../Routers/userRoute");
const authRouter = require("../Routers/authRoute");
const productRouter = require("../Routers/productRoute");

require('dotenv').config();

// const bcrypt = require("bcrypt");

const app = express();

// FIRST MIDDLEWARE
app.use(express.json());

// SECOND MIDDLEWARE
app.use(function (req, res, next) {
  console.log("Fetching...");
  next();
});

// THIRD MIDDLEWARE
app.use("/api/users", userRouter);
app.use("/api/auth", authRouter);
app.use("/api/products", productRouter);

// DATABASE CONNECTION STRING FROM ENVIRONMENT VARIABLE
const dbString = process.env.DB_CONNECTION_STRING;

async function connectDB() {
  try {
    await mongoose.connect(dbString);
    console.log("DataBase successfully connected");
  } catch (err) {
    console.log("Database connection failed:",err.message);
    process.exit(1); // Exit the process with a failure code
  }
}
connectDB();

// APP listening
const PORT = process.env.PORT || 4000;
app.listen(PORT, "localhost", function () {
  console.log(`My app is listening on port ${PORT}...`);
});
