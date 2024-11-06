const jwt = require("jsonwebtoken");

const User = require("../models/userModel");
const File = require("../models/fileModel");
const AppError = require("../utils/appError");
const catchAsync = require("../utils/catchAsync");

const path = require("path");
const fs = require("fs");

////////////////////////// Generate JWT////////////////////////////////
////////////////////////// Generate JWT////////////////////////////////
////////////////////////// Generate JWT////////////////////////////////
function generateJwt(id) {
  const token = jwt.sign({ id }, process.env.JWT_SECRET, {
    algorithm: "HS256",
  });
  return token;
}

function getIDFromToken(token) {
  const { id } = jwt.verify(token, process.env.JWT_SECRET);
  return id;
}

////////////////////////// Create User////////////////////////////////
////////////////////////// Create User////////////////////////////////
////////////////////////// Create User////////////////////////////////
exports.createUser = catchAsync(async (req, res, next) => {
  const { email, password, confirmPassword, name, role } = req.body;
  const roles = ["user", "staff"];
  if (!password || !confirmPassword)
    return next(new AppError("Please provide email and password", 400));

  if (password !== confirmPassword)
    return next(new AppError("Passwords don't match try again", 400));
  if (!roles.includes(role.toLowerCase()))
    return next(new AppError("Invalid role", 400));
  const user = await User.findOne({ email: RegExp(`^${email}$`, "i") });

  if (user)
    return next(new AppError("User with this email already exists", 400));

  const byName = await User.findOne({ name: RegExp(`^${name}$`, "i") });
  if (byName)
    return next(new AppError("User with this name already exists", 400));
  if (email) {
    const newUser = await User.create({
      email: email.toLowerCase(),
      password,
      name: name.toLowerCase(),
      role: role.toLowerCase(),
    });

    const jwt = generateJwt(newUser._id);
    res.cookie("jwt", jwt);

    res.status(201).json({
      message: "user created successfully",
      jwt,
    });
  } else {
    const newUser = await User.create({
      password,
      name: name.toLowerCase(),

      role: role.toLowerCase(),
    });

    const jwt = generateJwt(newUser._id);
    res.cookie("jwt", jwt);

    res.status(201).json({
      message: "user created successfully",
      jwt,
    });
  }
});

////////////////////////// Login User////////////////////////////////
////////////////////////// Login User////////////////////////////////
////////////////////////// Login User////////////////////////////////
exports.login = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password)
    return next(new AppError("Name and password are required", 400));

  const user = await User.findOne({
    $or: [{ email: email.toLowerCase() }, { name: email.toLowerCase() }],
  }).select("email password role");
  if (!user)
    return next(new AppError("No user found with this email or name", 404));

  const passwordsMatch = await user.comparePasswords(password);
  if (!passwordsMatch)
    return next(new AppError("Incorrect password try again", 400));

  const jwt = generateJwt(user._id);
  res.cookie("jwt", jwt);
  res.status(200).json({
    message: "sucess",
    jwt,
    role: user.role,
  });
});

////////////////////////// Logout User////////////////////////////////
////////////////////////// Logout User////////////////////////////////
////////////////////////// Logout User////////////////////////////////
exports.protect = catchAsync(async function (req, res, next) {
  const jwt =
    req.headers?.cookie?.split("=")[1] ||
    req.headers?.authorization?.split(" ")?.at(1);
  if (!jwt) return next(new AppError("Please login first", 401));

  const userId = getIDFromToken(jwt);

  const user = await User.findById(userId);
  if (!user) return next(new AppError("User does not exist", 401));
  req.user = user;

  next();
});
////////////////////////// Check role////////////////////////////////
////////////////////////// Check role////////////////////////////////
////////////////////////// Check role////////////////////////////////
exports.checkRole = function (role) {
  return catchAsync(async (req, res, next) => {
    const roles = role?.split(" ");

    // Check if user's role matches any of the roles in the array
    const isVerified = roles.includes(req?.user?.role);

    if (!isVerified) {
      return next(
        new AppError("You don't have access to perform this action", 400)
      );
    }

    next();
  });
};

exports.getUser = function (req, res, next) {
  res.status(200).json({
    message: "success",
    data: req.user,
  });
};

exports.getAllUsers = catchAsync(async function (req, res, next) {
  const users = await User.find({
    name: { $exists: true, $ne: null },
    role: "user",
  });

  res.status(200).json({
    message: "success",
    data: users,
  });
});
exports.getAllStaff = catchAsync(async function (req, res, next) {
  const users = await User.find({
    name: { $exists: true, $ne: null },
    role: "staff",
  });

  res.status(200).json({
    message: "success",
    data: users,
  });
});
const deleteUserFiles = catchAsync(async function (pdf, img) {
  // Define the paths for both PDF and image files
  const pdfFilePath = path.join(__dirname, "../uploads/pdfs", pdf);
  const imgFilePath = path.join(__dirname, "../uploads/imgs", img); // Adjust the folder if necessary

  // Function to delete a file and handle errors
  const deleteFile = (filePath, fileDescription) =>
    new Promise((resolve, reject) => {
      fs.unlink(filePath, (err) => {
        if (err) {
          if (err.code === "ENOENT") {
            resolve(); // Resolve if file not found to avoid breaking the process
          } else {
            reject(new AppError(`Error deleting ${fileDescription}`, 500));
          }
        } else {
          resolve();
        }
      });
    });

  // Delete both PDF and image files
  try {
    await deleteFile(pdfFilePath, "PDF file");
    await deleteFile(imgFilePath, "Image file");
  } catch (error) {
    console.error(error);
  }
});

exports.deleteUser = catchAsync(async function (req, res, next) {
  const { name } = req.params;

  // Delete the user by name
  const deletedUser = await User.findOneAndDelete({ name });

  if (!deletedUser) {
    return res.status(404).json({
      message: "User not found",
    });
  }

  // Fetch all files associated with the user
  const files = await File.find({ company: name });

  // Delete all user files concurrently
  const deleteFilePromises = files.map(async (file) => {
    await deleteUserFiles(file.path, file.img);
  });

  await Promise.all(deleteFilePromises); // Wait for all delete operations to complete

  // Delete all file records from the database
  await File.deleteMany({ company: name }); // Use deleteMany instead of findManyAndDelte

  res.status(200).json({
    message: "User and associated files deleted successfully",
  });
});
