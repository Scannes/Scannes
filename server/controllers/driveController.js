const axios = require("axios");
const Token = require("../models/tokenModel");
const File = require("../models/fileModel");
const AppError = require("../utils/appError");
const catchAsync = require("../utils/catchAsync");

const fs = require("fs");
const path = require("path");

// In-memory cache for token management
let cachedToken = null;

exports.updateCachedToken = function (token) {
  cachedToken = token;
};

// Get access token, either from cache or database
getAccessToken = async (next) => {
  const now = Date.now();
  // Check in-memory cache first
  if (cachedToken && cachedToken.expiration > now) {
    return cachedToken.accessToken;
  }

  // Retrieve token from the database
  const tokenDoc = await Token.findOne();
  if (tokenDoc && tokenDoc.expiration > now) {
    cachedToken = tokenDoc; // Update in-memory cache
    return tokenDoc.accessToken;
  }

  next(new AppError("Token Expired.Reauthentication required....", 401));
};

// Function to determine content type
const getContentType = (fileName) => {
  const extension = path.extname(fileName).toLowerCase();
  const contentTypes = {
    ".txt": "text/plain",
    ".pdf": "application/pdf",
    ".doc": "application/msword",
    ".docx":
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    ".xls": "application/vnd.ms-excel",
    ".xlsx":
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    ".png": "image/png",
    ".jpg": "image/jpeg",
    ".jpeg": "image/jpeg",
  };
  return contentTypes[extension] || "application/octet-stream";
};

const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];
// Upload file to OneDrive
exports.uploadFileToOneDrive = catchAsync(async (req, res, next) => {
  const year = new Date().getFullYear();
  const month = months[new Date().getMonth()];
  const { fileName, folderName, organization } = req.body;
  if (!fileName || !folderName || !organization)
    return next(
      new AppError(
        "File name, folder name and organization name is required",
        400
      )
    );

  const file = await File.findOneAndUpdate(
    { path: fileName },
    { isUploaded: true }
  );

  try {
    const accessToken = await getAccessToken(next); // Retrieve token from cache or database

    const filePath = path.join(__dirname, "../uploads/pdfs", fileName);
    if (!fs.existsSync(filePath))
      return next(new AppError("File not found", 404));

    const fileContent = fs.readFileSync(filePath);
    const contentType = getContentType(fileName);

    const response = await axios.put(
      `https://graph.microsoft.com/v1.0/me/drive/root:/Scannes.ch/${organization}/${year}/${month}/${folderName}/${fileName}:/content`,
      fileContent,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": contentType,
        },
      }
    );

    res.status(201).json({ status: "success", data: response.data });
  } catch (error) {
    return next(
      new AppError("Failed to upload file. Reauthenticatation required", 500)
    );
  }
});

// Fetch all files and folders from OneDrive
exports.fetchDriveData = catchAsync(async (req, res, next) => {
  try {
    const accessToken = await getAccessToken(next); // Retrieve token from cache or database

    const response = await axios.get(
      "https://graph.microsoft.com/v1.0/me/drive/root/children",
      {
        headers: { Authorization: `Bearer ${accessToken}` },
      }
    );

    res.status(200).json({ status: "success", data: response.data.value });
  } catch (error) {
    console.error(
      "Error fetching drive data:",
      error.response?.data || error.message
    );
    return next(new AppError("Failed to fetch drive data", 500));
  }
});

// Delete file from OneDrive by ID
exports.deleteFileFromOneDrive = catchAsync(async (req, res, next) => {
  const { itemId } = req.params;
  if (!itemId) return next(new AppError("File ID is required", 400));

  try {
    const accessToken = await getAccessToken(next); // Retrieve token from cache or database

    await axios.delete(
      `https://graph.microsoft.com/v1.0/me/drive/items/${itemId}`,
      {
        headers: { Authorization: `Bearer ${accessToken}` },
      }
    );

    res
      .status(204)
      .json({ status: "success", message: "File deleted successfully" });
  } catch (error) {
    console.error(
      "Error deleting file:",
      error.response?.data || error.message
    );
    return next(new AppError("Failed to delete file", 500));
  }
});
