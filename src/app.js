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

// Dynamic CORS configuration to handle multiple origins
app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin) return callback(null, true);

      if (clientOrigin.indexOf(origin) !== -1) {
        callback(null, true);
      } else {
        callback(new Error(`Origin ${origin} not allowed by CORS`));
      }
    },
    credentials: true,
  }),
);

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
