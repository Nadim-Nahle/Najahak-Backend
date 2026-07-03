const app = require("./src/app");
const connectDB = require("./src/config/db");
const { port } = require("./src/config/env");

async function start() {
  await connectDB();

  const server = app.listen(port, () => {
    console.log(`[server] Listening on http://localhost:${port}`);
  });

  const shutdown = (signal) => {
    console.log(`[server] Received ${signal}, shutting down gracefully`);
    server.close(() => process.exit(0));
  };
  process.on("SIGTERM", () => shutdown("SIGTERM"));
  process.on("SIGINT", () => shutdown("SIGINT"));
}

start();
