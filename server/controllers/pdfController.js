const multer = require("multer");
const path = require("path");
const fs = require("fs");
const archiver = require("archiver");

const File = require("../models/fileModel");
const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/appError");
const { error } = require("console");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    if (file.fieldname === "img") {
      cb(null, path.join(__dirname, "../uploads/imgs"));
    } else {
      cb(null, path.join(__dirname, "../uploads/pdfs"));
    }
  },
  filename: (req, file, cb) => {
    if (file.fieldname === "img") {
      cb(
        null,
        `${file.originalname}_FILEIMG_${req.user._id}.${
          file.mimetype.split("/")[1]
        }`
      );
    } else {
      console.log(file);
      cb(null, `${file.originalname}`);
    }
  },
});

exports.upload = multer({ storage });

exports.uploadPdf = catchAsync(async function (req, res, next) {
  const pdf = req.files.file;
  const img = req.files.img;
  const name = req.body.name;
  const pages = req.body.pages;
  const category = req.body.category;
  const company = req.user.name;

  if (!name) return next(new AppError("File name is required", 400));
  const file = await File.create({
    name,
    path: pdf?.at(0)?.filename,
    img: img?.at(0)?.filename,

    user: req.user._id,
    pages,
    date: new Date(),
    category,
    company,
  });
  res.status(200).json({
    message: "Files Uploaded successfully",
    file,
  });
});

exports.uploadPdfOnly = catchAsync(async function (req, res, next) {
  const pdf = req.files.file;
  const category = req.body.category;
  const name = pdf?.at(0)?.originalname.replace(/\.pdf$/i, "");

  const file = await File.create({
    name: name,
    path: pdf?.at(0)?.originalname,
    img: "default.jfif",
    user: req.user._id,
    date: new Date(),
    company: req.user.name,
    category,
  });
  res.status(200).json({
    message: "Files Uploaded successfully",
    file,
  });
});
exports.pdf = function (req, res, next) {
  const filePath = path.join(__dirname, "../uploads", req.query.filename);
  res.sendFile(filePath);
};
// Route to get all available PDFs in the uploads directory

// Route to serve all PDFs as a ZIP file
exports.allPdf = function (req, res, next) {
  const uploadsDir = path.join(__dirname, "../uploads");

  // Read all files in the uploads directory
  fs.readdir(uploadsDir, (err, files) => {
    if (err) {
      return next(err); // Pass the error to Express error handler
    }

    // Filter to get only PDF files
    const pdfFiles = files.filter(
      (file) => path.extname(file).toLowerCase() === ".pdf"
    );

    if (pdfFiles.length === 0) {
      return res.status(404).json({ message: "No PDF files found" });
    }

    // Set the headers to let the client know that this is a downloadable ZIP file
    res.setHeader("Content-Type", "application/zip");
    res.setHeader("Content-Disposition", "attachment; filename=pdfs.zip");

    // Create a zip stream
    const archive = archiver("zip", { zlib: { level: 9 } });

    // Stream the ZIP file back to the client
    archive.pipe(res);

    // Append each PDF file to the ZIP archive
    pdfFiles.forEach((file) => {
      const filePath = path.join(uploadsDir, file);
      archive.file(filePath, { name: file });
    });

    // Finalize the archive (this will also send it to the client)
    archive.finalize();
  });
};
exports.deletePdf = catchAsync(async function (req, res, next) {
  const name = req.body.filename;
  console.log(name);

  // Find the file in the database
  const file = await File.findOne({ path: name });
  if (!file) {
    return next(new AppError("File not found", 404));
  }

  // Define the paths for both PDF and image files
  const pdfFilePath = path.join(__dirname, "../uploads/pdfs", name);
  const imgFilePath = path.join(__dirname, "../uploads/imgs", file.img); // Adjust the folder if necessary

  // Function to delete a file and handle errors
  const deleteFile = (filePath, fileDescription) =>
    new Promise((resolve, reject) => {
      fs.unlink(filePath, (err) => {
        if (err) {
          if (err.code === "ENOENT") {
            console.warn(`${fileDescription} not found on server.`);
            resolve(); // Resolve if file not found to avoid breaking the process
          } else {
            reject(new AppError(`Error deleting ${fileDescription}`, 500));
          }
        } else {
          console.log(`${fileDescription} deleted successfully.`);
          resolve();
        }
      });
    });

  // Delete both PDF and image files, then remove the document record from the database
  try {
    await deleteFile(pdfFilePath, "PDF file");
    await deleteFile(imgFilePath, "Image file");

    // Remove the file record from the database
    await File.deleteOne({ _id: file._id });

    // Respond with success
    res
      .status(200)
      .json({ message: "File and associated image deleted successfully" });
  } catch (error) {
    next(error);
  }
});
exports.renamePdf = catchAsync(async function (req, res, next) {
  const { name, newName } = req.body;
  // Find the file in the database
  const file = await File.findOne({ path: name });
  if (!file) {
    return next(new AppError("File not found", 404));
  }

  const fileExists = await File.findOne({ path: RegExp(`^${newName}.pdf$`) });
  if (fileExists)
    return next(new AppError(`File with name ${newName} already exists`, 400));

  // Define the original and new paths for the PDF file
  const pdfFilePath = path.join(__dirname, "../uploads/pdfs", name);
  const newPdfFilePath = path.join(
    __dirname,
    "../uploads/pdfs",
    newName + ".pdf"
  );

  // Rename the PDF file
  fs.rename(pdfFilePath, newPdfFilePath, async (err) => {
    if (err) {
      console.error("Error renaming PDF file:", err);
      return next(new AppError("Error renaming PDF file", 500));
    } else {
      console.log("PDF file renamed successfully");

      // Update the file path in the database if needed
      file.path = newName + ".pdf";
      file.name = newName;
      await file.save();

      // Respond with success
      res.status(200).json({ message: "PDF file renamed successfully" });
    }
  });
});
