const multer = require("multer");
// const sharp = require("sharp"); // To handle image resizing and formatting
// const User = require("../Models/userModel");

// 1. Configure multer to store files in memory
// This means the files are stored in RAM as buffers and not directly saved on disk.
const multerStorage = multer.memoryStorage();

// 2. Define a filter to only accept image files
// The file type is checked based on its MIME type.
const multerFilter = function (req, file, cb) {
  // Check if the uploaded file's MIME type starts with 'image'
  if (file.mimetype.startsWith("image")) {
    // If the file is an image, accept the file (no error: null, file: true)
    cb(null, true);
  } else {
    // If it's not an image, reject the file (no error: null, file: false)
    cb(new Error("Please upload only images"), false);
  }
};

// 3. Create the upload middleware using multer with the specified storage and file filter
const upload = multer({
  storage: multerStorage,  // Store files in memory
  fileFilter: multerFilter, // Apply the filter to allow only images
});

// 4. Middleware to handle the upload of a single image file
// 'image' is the name of the field in the form that contains the image file
exports.uploadToServer = upload.single('image');
