require("dotenv").config();

const app = require("./src/app");
const connectDB = require("./src/db/db");

const PORT = process.env.PORT || 3000;

// Connect to MongoDB
connectDB()
  .then(() => {
    console.log("✅ MongoDB Connected");

    // Root Route
    app.get("/", (req, res) => {
      res.status(200).json({
        success: true,
        message: "SnapFeed Backend is Running 🚀",
      });
    });

    // Start Server
    app.listen(PORT, () => {
      console.log(`🚀 Server running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("❌ Database Connection Failed");
    console.error(err);
    process.exit(1);
  });

// Handle Uncaught Exceptions
process.on("uncaughtException", (err) => {
  console.error("Uncaught Exception:", err);
  process.exit(1);
});

// Handle Unhandled Promise Rejections
process.on("unhandledRejection", (err) => {
  console.error("Unhandled Rejection:", err);
  process.exit(1);
});
