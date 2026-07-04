const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");

const { env, clientOrigin } = require("./config/env");
const { errorHandler, notFoundHandler } = require("./middlewares/errorHandler");
const protect = require("./middlewares/auth");
const requestRoutes = require("./routes/requestRoutes");
const authRoutes = require("./routes/authRoutes");

const app = express();

app.use(helmet());
app.use(cors({ origin: clientOrigin }));
app.use(express.json());
if (env !== "test") {
  app.use(morgan(env === "development" ? "dev" : "combined"));
}

//Health check
app.get("/health", (req, res) => {
  res.json({ status: "ok", uptime: process.uptime() });
});

// Auth routes
app.use("/api/auth", authRoutes);

//API routes
app.use("/api/requests", protect, requestRoutes);

//404 error handling
app.use(notFoundHandler);
app.use(errorHandler);

module.exports = app;
