const express = require("express");
const Revenue = require("../models/Revenue");
const router = express.Router();

// Get
router.get("/", async (req, res) => {
  try {
    const revenueData = await Revenue.find().populate("courseId", "title").populate("tutorId", "name");
    res.json(revenueData);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.post("/add", async (req, res) => {
  try {
    const { courseId, tutorId, totalEarnings, commission } = req.body;

    // Validate request body
    if (!courseId || !tutorId || totalEarnings == null || commission == null) {
      return res.status(400).json({ error: "All fields are required." });
    }

    // Ensure totalEarnings and commission are numbers
    const parsedTotalEarnings = Number(totalEarnings);
    const parsedCommission = Number(commission);

    if (isNaN(parsedTotalEarnings) || isNaN(parsedCommission)) {
      return res.status(400).json({ error: "totalEarnings and commission must be valid numbers." });
    }

    // Create new revenue entry
    const revenue = new Revenue({
      courseId,
      tutorId,
      totalEarnings: parsedTotalEarnings,
      commission: parsedCommission,
      netEarnings: parsedTotalEarnings - parsedCommission,
      transactions: [] // Initialize empty transactions
    });

    await revenue.save();
    res.status(201).json({ message: "Revenue added successfully", revenue });

  } catch (error) {
    console.error("Error adding revenue:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});


router.get("/revenue", async (req, res) => {
  try {
      const revenue = await Revenue.find();
      res.json(revenue);
  } catch (error) {
      console.error("Error fetching revenue:", error);
      res.status(500).json({ error: "Internal Server Error" });
  }
});

// Track 
router.get("/tutor/:tutorId", async (req, res) => {
  try {
    const tutorRevenue = await Revenue.find({ tutorId: req.params.tutorId });
    res.json(tutorRevenue);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;
