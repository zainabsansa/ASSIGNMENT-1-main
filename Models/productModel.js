const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  creator:{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  name: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: [true, "Product must have a Price"],
  },
  ingredients: {
    type: String,
  },
  image: String, //shorthand because it has only one sub
});

const Product = mongoose.model("Product", productSchema);
module.exports= Product ;
