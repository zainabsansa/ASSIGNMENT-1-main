const sharp = require("sharp");
const User = require("../Models/userModel");
const { hashPassword } = require("../Helpers/passwordHelpers");

// POST USER
exports.createUser = async function (req, res) {
  try {
    const { firstName, lastName, email, password, age } = req.body;

    // Check if email already exists
    const emailExist = await User.findOne({ email });
    if (emailExist) {
      return res.status(400).json({ message: "Email already exists" });
    }

    //    {
    //     "firstName": "Zainab",
    //     "lastName": "Sansa",
    //     "email": "zainabsansa03@gmail.com",
    //     "password":"nhthjhn"
    //     }

    // Hash password asynchronously
    const hashedPassword = await hashPassword(password);

    const newUser = await User.create({
      firstName,
      lastName,
      email,
      password: hashedPassword,
      age,
    });

    res.status(201).json({
      status: "success",
      data: {
        user: newUser,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: err.message,
    });
  }
};

// GET USER
exports.getUser = async function (req, res) {
  try {
    const users = await User.find();
    res.status(200).json({
      status: "success",
      users: users,
    });
  } catch (err) {
    res.status(400).json({
      message: err.message,
      status: "fail",
    });
  }
};

// GET ONE USER
exports.getOneUser = async function (req, res) {
  try {
    const user = await User.findById(req.params.id);
    res.status(200).json({
      status: "success",
      user: user,
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: err.message,
    });
  }
};

// UPDATE USER
exports.updateUser = async function (req, res) {
  try {
    const updateUser = await User.findByIdAndUpdate(req.params.id, req.body, {
      runValidators: true,
      new: true,
    });
    res.status(200).json({
      status: "success",
      data: {
        users: updateUser,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: err.message,
    });
  }
};

// DELETE USER
exports.deleteUser = async function (req, res) {
  try {
    await User.findByIdAndDelete(req.params.userId);
    res.status(200).json({
      status: "success",
      message: "User Deleted",
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: "User not deleted!",
    });
  }
};

//UPLOAD USER IMAGE
exports.uploadUserImage = async function (req, res) {
  try {
    // Log the uploaded file information (useful for debugging)
    console.log(req.file);

    // If no file is uploaded, return a response with a relevant message
    if (!req.file) {
      return res.status(400).json({ message: "No Image was Uploaded" });
    }

    // Fetch the user from the database using the authenticated user's ID
    const user = await User.findById(req.user._id);

    // Define a unique name for the image file using the user ID and current timestamp
    const imageFileName = `user-${user._id}-${Date.now()}.jpeg`;

    // Use sharp to process the uploaded image:
    // - Resize it to 750x750 pixels
    // - Convert it to JPEG format with 80% quality
    // - Save it to the specified directory (e.g., 'Public/Assets/Users')
    await sharp(req.file.buffer)
      .resize(750, 750)
      .toFormat("jpeg")
      .jpeg({ quality: 80 })
      .toFile(`Public/Assets/Users/${imageFileName}`);

    // Update the user's image field with the new image file name
    user.image = imageFileName;

    // Save the updated user information without running validation checks
    await user.save({ validateBeforeSave: false });

    res.status(200).json({
      status: "success",
      message: "Image Successfully Uploaded",
      data: {
        user,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: err.message || "Something went wrong during the image upload",
    });
  }
};
