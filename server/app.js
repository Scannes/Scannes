const dotenv = require("dotenv");

dotenv.config({
  path: "./.env",
});
const express = require("express");
const path = require("path");
const morgan = require("morgan");
const cors = require("cors");

const app = express();

// Routers
const userRouter = require("./routers/userRouter");
const pdfRouter = require("./routers/pdfRouter");
const driveRouter = require("./routers/oneDriveRouter");
const authRouter = require("./routers/authRouter");
const fileRouter = require("./routers/fileRouter");

// Controllers
const errorController = require("./controllers/errorController");

app.use(
  cors({
    origin: "*",
  })
);
app.use(morgan("dev"));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Routes
app.use("/api/v1/users", userRouter);
app.use("/api/v1/pdf", pdfRouter);
app.use("/api/v1/drive", driveRouter);
app.use("/api/v1/files", fileRouter);
app.use("/auth", authRouter);
app.use("/img", express.static(path.join(__dirname, "/uploads/imgs/")));
app.use("/file", express.static(path.join(__dirname, "/uploads/pdfs/")));
// Middleware to set the download headers for files in the /uploads/pdfs directory
app.use("/file/download", (req, res, next) => {
  res.setHeader("Content-Disposition", "attachment");
  next();
});

// Serve static files from the uploads/pdfs directory
app.use(
  "/file/download",
  express.static(path.join(__dirname, "/uploads/pdfs"))
);

app.use(errorController);
module.exports = app;
