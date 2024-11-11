const File = require("../models/fileModel");

const catchAsync = require("../utils/catchAsync");

exports.getAllFiles = catchAsync(async function (req, res, next) {
  if (req.user.role === "admin") {
    const files = await File.find().sort({ date: -1 });

    res.status(200).json({
      message: "success",
      data: files,
      noOfFiles: files.length,
    });
  } else if (req.user.role === "staff") {
    const files = await File.find({
      company: { $in: req.user.companies },
    }).sort({ date: -1 });

    res.status(200).json({
      message: "success",
      data: files,
      noOfFiles: files.length,
    });
  } else {
    const files = await File.find({ user: req.user._id }).sort({ date: -1 });
    console.log("here");
    res.status(200).json({
      message: "success",
      data: files,
      noOfFiles: files.length,
    });
  }
});

exports.getUserFiles = catchAsync(async function (req, res, next) {
  const user = req.params.user;
  if (!user) return next(new AppError("User is required"));
  const files = await File.find({
    company: { $regex: new RegExp(`^${user}$`, "i") },
  }).sort({ date: -1 });
  res.status(200).json({
    message: "success",
    data: files,
    noOfFiles: files.length,
  });
});

exports.getFilesByMonthAndCategory = catchAsync(async function (
  req,
  res,
  next
) {
  const month = req.params.month;
  const category = req.params.category;

  if (!month) return next(new AppError("Month is required"));
  if (!category) return next(new AppError("Category is required"));

  // Parse month to get start and end dates
  const [year, monthPart] = month.split("-").map(Number);
  const startOfMonth = new Date(year, monthPart - 1, 1);
  const endOfMonth = new Date(year, monthPart, 1);

  const files = await File.find({
    date: { $gte: startOfMonth, $lt: endOfMonth },
    category: { $regex: new RegExp(`^${category}$`, "i") },
  }).sort({ date: -1 });

  res.status(200).json({
    message: "success",
    data: files,
    noOfFiles: files.length,
  });
});

exports.getFilesByMonthAndCategoryAndCompany = catchAsync(async function (
  req,
  res,
  next
) {
  const month = req.params.month;
  const category = req.params.category;
  const company = req.params.company;

  if (!month) return next(new AppError("Month is required"), 400);
  if (!category) return next(new AppError("Category is required"), 400);
  if (!company) return next(new AppError("Company is required"), 400);

  // Parse month to get start and end dates
  const [year, monthPart] = month.split("-").map(Number);
  const startOfMonth = new Date(year, monthPart - 1, 1);
  const endOfMonth = new Date(year, monthPart, 1);

  const files = await File.find({
    date: { $gte: startOfMonth, $lt: endOfMonth },
    category: { $regex: new RegExp(`^${category}$`, "i") },
    company: { $regex: new RegExp(`^${company}$`, "i") },
  }).sort({ date: -1 });

  res.status(200).json({
    message: "success",
    data: files,
    noOfFiles: files.length,
  });
});
