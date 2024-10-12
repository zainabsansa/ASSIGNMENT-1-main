const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: [true, "Name is required!"],
    minlength: 3,
    trim: true,
  },
  lastName: {
    type: String,
    required: [true, "Name is required!"],
    minlength: 3,
    trim: true,
  },
  email: {
    type: String,
    required: [true, "Please enter your email"],
    trim: true,
    lowercase: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    minlength: 8,
  },
  age: {
    type: Number,
    min: [0, "Age must be positive"],
  },
});

const User = mongoose.model("User", userSchema);
module.exports = User;
