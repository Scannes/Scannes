const jwt = require("jsonwebtoken");

const User = require("../models/userModel");
const File = require("../models/fileModel");
const AppError = require("../utils/appError");
const catchAsync = require("../utils/catchAsync");

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
  const { email, password, confirmPassword, name } = req.body;
  if (!email || !password || !confirmPassword)
    return next(new AppError("Please provide email and password", 400));

  if (password !== confirmPassword)
    return next(new AppError("Passwords don't match try again", 400));

  const user = await User.findOne({ email: RegExp(`^${email}$`, "i") });

  if (user)
    return next(new AppError("User with this email already exists", 400));

  const byName = await User.findOne({ name: RegExp(`^${name}$`, "i") });
  if (byName)
    return next(new AppError("User with this name already exists", 400));
  const newUser = await User.create({ email, password, name });

  const jwt = generateJwt(newUser._id);
  res.cookie("jwt", jwt);

  res.status(201).json({
    message: "user created successfully",
    jwt,
  });
});

////////////////////////// Login User////////////////////////////////
////////////////////////// Login User////////////////////////////////
////////////////////////// Login User////////////////////////////////
exports.login = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password)
    return next(new AppError("Email and password are required", 400));

  const user = await User.findOne({ email }).select("email password role");
  if (!user) return next(new AppError("No user found with this email", 404));

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
    req.headers.authorization.split(" ")?.at(1);
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
    if (role !== req?.user?.role)
      return next(
        new AppError("You are not allowed to perform this action", 400)
      );

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
  const users = await User.find({ name: { $exists: true, $ne: null } });

  res.status(200).json({
    message: "success",
    data: users,
  });
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

  // Delete all files associated with the user
  await File.deleteMany({ company: name });

  res.status(200).json({
    message: "User and associated files deleted successfully",
  });
});
