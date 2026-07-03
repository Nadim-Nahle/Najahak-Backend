const { verifyToken } = require("../utils/jwt");
const userRepository = require("../repositories/userRepository");
const ApiError = require("../utils/ApiError");
const asyncHandler = require("../utils/asyncHandler");

// Route protection middleware. Any route that needs a logged-in user

const protect = asyncHandler(async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    throw ApiError.unauthorized("Not authenticated. Please log in.");
  }

  const token = authHeader.split(" ")[1];

  let decoded;
  try {
    decoded = verifyToken(token);
  } catch (err) {
    throw ApiError.unauthorized(
      "Invalid or expired token. Please log in again.",
    );
  }

  const user = await userRepository.findById(decoded.sub);
  if (!user) {
    throw ApiError.unauthorized("User no longer exists");
  }

  req.user = user;
  next();
});

module.exports = protect;
