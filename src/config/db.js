const mongoose = require("mongoose");
const { mongoUri } = require("./env");

async function connectDB() {
  mongoose.set("strictQuery", true);

  try {
    await mongoose.connect(mongoUri);
    console.log(`[db] Connected to MongoDB (${mongoose.connection.name})`);
  } catch (error) {
    console.error("[db] MongoDB connection failed:", error.message);
    process.exit(1); // No point running an API with no database
  }

  mongoose.connection.on("disconnected", () => {
    console.warn("[db] MongoDB disconnected");
  });
}

module.exports = connectDB;
