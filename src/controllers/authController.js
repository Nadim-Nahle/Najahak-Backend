const authService = require("../services/authService");
const asyncHandler = require("../utils/asyncHandler");

// POST /api/auth/register
const register = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const result = await authService.registerUser({ email, password });
  res.status(201).json({ success: true, data: result });
});

// POST /api/auth/login
const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const result = await authService.loginUser({ email, password });
  res.status(200).json({ success: true, data: result });
});

module.exports = { register, login };
