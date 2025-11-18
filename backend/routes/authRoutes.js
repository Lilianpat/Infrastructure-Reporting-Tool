const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");

const { registerUser, loginUser, verifyEmail, forgotPassword, resetPassword } = require("../controllers/authController");

router.post("/register", authController.registerUser);

router.post("/login", loginUser);
router.get("/verify/:token", verifyEmail);
router.post("/resend-verification", authController.resendVerification);

router.post("/forgot-password", forgotPassword);
router.post("/reset-password/:token", resetPassword);

module.exports = router;
