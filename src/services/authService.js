const userRepository = require("../repositories/userRepository");
const { hashPassword, comparePassword } = require("../utils/password");
const { signToken } = require("../utils/jwt");
const ApiError = require("../utils/ApiError");

const MIN_PASSWORD_LENGTH = 6;

async function registerUser({ email, password }) {
  if (!password || password.length < MIN_PASSWORD_LENGTH) {
    throw ApiError.badRequest(
      `Password must be at least ${MIN_PASSWORD_LENGTH} characters`,
    );
  }

  const existing = await userRepository.findByEmail(email);
  if (existing) {
    throw ApiError.badRequest("An account with this email already exists");
  }

  const hashedPassword = await hashPassword(password);
  const user = await userRepository.create({ email, password: hashedPassword });

  const token = signToken(user._id);

  return {
    token,
    user: { id: user._id, email: user.email },
  };
}

async function loginUser({ email, password }) {
  const user = await userRepository.findByEmailWithPassword(email);

  const invalidCredentialsError = ApiError.badRequest(
    "Invalid email or password",
  );

  if (!user) {
    throw invalidCredentialsError;
  }

  const isMatch = await comparePassword(password, user.password);
  if (!isMatch) {
    throw invalidCredentialsError;
  }

  const token = signToken(user._id);

  return {
    token,
    user: { id: user._id, email: user.email },
  };
}

module.exports = { registerUser, loginUser };
