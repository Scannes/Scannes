const express = require("express");
const driveController = require("../controllers/driveController");
const authController = require("../controllers/authController");

const router = express.Router();

router.post(
  "/",
  authController.protect,
  authController.checkRole("admin staff"),
  driveController.uploadFileToOneDrive
);
// router.get("/", driveController.fetchDriveData);
// router.delete("/:itemId", driveController.deleteFileFromOneDrive);
module.exports = router;
