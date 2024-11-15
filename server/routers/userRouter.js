const express = require("express");
const router = express.Router();

const authController = require("../controllers/authController");

router.post(
  "/signup",
  authController.protect,
  authController.checkRole("admin"),
  authController.createUser
);
router.post("/login", authController.login);
router.get("/", authController.protect, authController.getUser);
router.post(
  "/add-to-company",
  authController.protect,
  authController.checkRole("admin"),
  authController.addCompany
);
router.get(
  "/users",
  authController.protect,
  authController.checkRole("admin staff"),
  authController.getAllUsers
);
router.get(
  "/staff",
  authController.protect,
  authController.checkRole("admin"),
  authController.getAllStaff
);
router.delete(
  "/:name",
  authController.protect,
  authController.checkRole("admin"),
  authController.deleteUser
);
module.exports = router;
