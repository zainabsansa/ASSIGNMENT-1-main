const express = require("express");
const Product = require("../Models/productModel");

 // POST
 exports.createProduct =  async function (req, res) {
  try {
    const {creator, name, price, description, image} = req.body;

    const newProduct = await Product.create({
      creator,
      name,
      price,
      description,
      image
    });

    res.status(201).json({
      status: "success",
      data: {
        products: newProduct,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: err.message,
    });
  }
}

// GET PRODUCT
exports.getAllProducts = async function (req, res) {
    // response.send("Hello from my API end-point");
    try { 
      const products = await Product.find();
  
      res.status(200).json({
        status: "success",
        data: {
          products: products,
        },
      });
    } catch (err) {
      res.status(400).json({
        status: "fail",
        message: err.message,
      });
    }
  }

// GET ONE PRODUCT
exports.getOneProduct = async function (req, res) {
    try {
      const products = await Product.findById(req.params.id);
      res.status(200).json({
        status: "success",
        data: {
          products: products,
        },
      });
    } catch (err) {
      res.status(400).json({
        status: "fail",
        message: err.message,
      });
    }
  }

  // UPDATE
exports.updateProduct =  async function (req, res) {
    try {
      const updatedProduct = await Product.findByIdAndUpdate(
        req.params.id,
        req.body,
        {
          runValidators: true,
          new: true,
        }
      );
      res.status(200).json({
        status: "success",
        data: {
          products: updatedProduct,
        },
      });
    } catch (err) {
      res.status(400).json({
        status: "fail",
        message: err.message,
      });
    }
  }

// DELETE ONE PRODUCT
exports.deleteProduct =  async function (req, res) {
    try {
      await Product.findByIdAndDelete(req.params.productId);
      res.status(200).json({
        status: "success",
        message: "product deleted!",
      });
    } catch (err) {
      res.status(400).json({
        status: "fail",
        message: err.message,
      });
    }
  }

