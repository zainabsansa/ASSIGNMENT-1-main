const express = require("express");
const userController = require("../Controllers/userController");
const { protected } = require("../Middlewares/protected");
const multer = require("../Middlewares/multer")
const userRouter = express.Router();

// CREATE USER
userRouter.post("/createUser", userController.createUser);

// GET USER
userRouter.get("/getUser", userController.getUser);

// GET ONE USER
userRouter.get("/getOneUser/:id", userController.getOneUser);

// UPDATE USER
userRouter.patch("/updateUser/:id", userController.updateUser);

//DELETE USER
userRouter.delete("/deleteUser/:id", userController.deleteUser);

// PATCH USER
userRouter.patch("/uploadImage", protected.authProtected, multer.uploadToServer, userController)

module.exports = userRouter;