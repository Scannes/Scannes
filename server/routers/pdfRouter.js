const express = require("express");
const router = express.Router({ mergeParams: true });

const pdfController = require("../controllers/pdfController");
const authController = require("../controllers/authController");

router.get(
  "/",
  authController.protect,
  authController.checkRole("admin"),
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
router.get("/all", pdfController.allPdf);

router.post("/delete", pdfController.deletePdf);
router.post("/rename", pdfController.renamePdf);

module.exports = router;
