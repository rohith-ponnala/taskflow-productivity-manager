const express = require("express");

const {
  register,
  login,
  profile,
  forgotPassword,
} = require("../controllers/authController");

const protect = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/register", register);

router.post("/login", login);

router.post("/forgot-password", forgotPassword);

router.get("/profile", protect, profile);

module.exports = router;