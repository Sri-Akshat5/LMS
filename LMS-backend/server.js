const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const connectDB = require("./config/db");

// Load environment variables
dotenv.config();

// Connect to database
connectDB();

const app = express();

// Middleware
app.use(express.json()); // Parse JSON
app.use(
  cors({
    origin: process.env.CLIENT_URL, // Secure CORS configuration
    credentials: true,
  })
);

// Import Routes
const authRoutes = require("./routes/authRoute");
const courseRoutes = require("./routes/courseRoute");
const studentRoutes = require("./routes/studentRoutes");
const quizRoutes = require("./routes/quizRoute");
const assignmentRoutes = require("./routes/assignmentRoute");
const forumRoutes = require("./routes/forumRoute");
const revenueRoutes = require("./routes/revenueRoute");
const analyticsRoutes = require("./routes/analyticsRoute");
const adminRoutes = require("./routes/adminRoute");

// Define Routes
app.use("/api/auth", authRoutes);
app.use("/api/courses", courseRoutes);
app.use("/api/students", studentRoutes);
app.use("/api/quizzes", quizRoutes);
app.use("/api/assignments", assignmentRoutes);
app.use("/api/forums", forumRoutes);
app.use("/api/revenue", revenueRoutes);
app.use("/api/analytics", analyticsRoutes);
app.use("/api/admin", adminRoutes);

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));
