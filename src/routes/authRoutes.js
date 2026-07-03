const express = require("express");
const authController = require("../controllers/authController");

// Same role as requestRoutes.js: pure wiring, no logic.
const router = express.Router();

router.post("/register", authController.register); // POST /api/auth/register
router.post("/login", authController.login); // POST /api/auth/login

module.exports = router;
