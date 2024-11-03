const express = require("express");

const fileController = require("../controllers/fileController");
const authController = require("../controllers/authController");

const router = express.Router();

router.get("/", authController.protect, fileController.getAllFiles);
router.get("/:user", authController.protect, fileController.getUserFiles);
router.get(
  "/:month/:category",
  authController.protect,
  fileController.getFilesByMonthAndCategory
);
router.get(
  "/:month/:category/:company",
  authController.protect,
  fileController.getFilesByMonthAndCategoryAndCompany
);
module.exports = router;
