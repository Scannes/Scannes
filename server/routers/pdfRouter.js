const express = require("express");
const router = express.Router({ mergeParams: true });

const pdfController = require("../controllers/pdfController");
const authController = require("../controllers/authController");

router.get(
  "/",
  authController.protect,
  authController.checkRole("admin staff"),
  pdfController.pdf
);
router.post(
  "/",
  authController.protect,
  pdfController.upload.fields([
    {
      name: "file",
    },
    { name: "img" },
  ]),
  pdfController.uploadPdf
);

// For admin
router.get(
  "/all",
  authController.protect,

  authController.checkRole("admin staff"),
  pdfController.allPdf
);

router.post(
  "/delete",
  authController.protect,
  authController.checkRole("admin"),
  pdfController.deletePdf
);
router.post(
  "/rename",
  authController.protect,
  authController.checkRole("admin staff"),

  pdfController.renamePdf
);

module.exports = router;
