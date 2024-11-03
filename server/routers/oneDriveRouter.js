const express = require("express");
const driveController = require("../controllers/driveController");

const router = express.Router();

router.post("/", driveController.uploadFileToOneDrive);
router.get("/", driveController.fetchDriveData);
router.delete("/:itemId", driveController.deleteFileFromOneDrive);
module.exports = router;
