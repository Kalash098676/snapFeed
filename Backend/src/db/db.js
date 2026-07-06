const dns = require("node:dns");
dns.setServers(["1.1.1.1", "8.8.8.8"]);

const mongoose = require("mongoose");

async function connectDB() {
  try {
    await mongoose.connect(process.env.MONGO_URI);

    console.log("Connected to DB");
  } catch (error) {
    console.error("Database Connection Error:", error);
  }
}

module.exports = connectDB;