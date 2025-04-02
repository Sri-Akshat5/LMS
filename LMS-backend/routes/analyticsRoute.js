const express = require("express");
const Course = require("../models/Course");
const User = require("../models/User");
const Revenue = require("../models/Revenue");
const router = express.Router();

// Get 
router.get("/stats", async (req, res) => {
  try {
    const totalUsers = await User.countDocuments();
    const totalCourses = await Course.countDocuments();
    const totalRevenue = await Revenue.aggregate([{ $group: { _id: null, total: { $sum: "$totalEarnings" } } }]);

    res.json({
      totalUsers,
      totalCourses,
      totalRevenue: totalRevenue.length > 0 ? totalRevenue[0].total : 0
    });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;
