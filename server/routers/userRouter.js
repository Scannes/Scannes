const express = require("express");
const router = express.Router();

const authController = require("../controllers/authController");

router.post("/signup", authController.createUser);
router.post("/login", authController.login);
router.get("/", authController.protect, authController.getUser);
router.get("/users", authController.protect, authController.getAllUsers);
router.delete("/:name", authController.protect, authController.deleteUser);
module.exports = router;
