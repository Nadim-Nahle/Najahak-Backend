const ApiError = require("../utils/ApiError");
const { env } = require("../config/env");

function errorHandler(err, req, res, next) {
  let error = err;

  if (err.name === "CastError") {
    error = ApiError.badRequest(`Invalid id: ${err.value}`);
  } else if (err.name === "ValidationError") {
    const details = Object.values(err.errors).map((e) => e.message);
    error = ApiError.badRequest("Validation failed", details);
  } else if (!(err instanceof ApiError)) {
    error = ApiError.internal(env === "development" ? err.message : undefined);
  }

  const status = error.statusCode || 500;

  res.status(status).json({
    success: false,
    message: error.message || "Something went wrong",
    ...(error.details ? { details: error.details } : {}),
    ...(env === "development" ? { stack: err.stack } : {}),
  });
}

function notFoundHandler(req, res, next) {
  next(ApiError.notFound(`Route not found: ${req.method} ${req.originalUrl}`));
}

module.exports = { errorHandler, notFoundHandler };
