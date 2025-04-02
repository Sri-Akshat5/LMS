const express = require("express");
const Assignment = require("../models/Assignment");
const router = express.Router();

// Create 
router.post("/create", async (req, res) => {
  try {
    const { title, description, courseId, dueDate, fileUrl } = req.body;

    if (!title || !description || !courseId || !dueDate) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const assignment = new Assignment({ title, description, courseId, dueDate, fileUrl });
    await assignment.save();

    res.status(201).json({ message: "Assignment created successfully!", assignment });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Get  
router.get("/course/:courseId", async (req, res) => {
  try {
    const assignments = await Assignment.find({ courseId: req.params.courseId });
    res.json(assignments);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Submit 
router.post("/submit/:assignmentId", async (req, res) => {
  try {
    const { studentId, fileUrl } = req.body;

    if (!studentId || !fileUrl) {
      return res.status(400).json({ message: "Student ID and file URL are required" });
    }

    const assignment = await Assignment.findById(req.params.assignmentId);
    if (!assignment) return res.status(404).json({ message: "Assignment not found!" });

    assignment.submissions.push({ studentId, fileUrl });
    await assignment.save();

    res.json({ message: "Assignment submitted successfully!", assignment });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Grade 
router.post("/grade/:assignmentId/:studentId", async (req, res) => {
  try {
    const { grade } = req.body;

    const assignment = await Assignment.findById(req.params.assignmentId);
    if (!assignment) return res.status(404).json({ message: "Assignment not found!" });

    const submission = assignment.submissions.find(sub => sub.studentId.toString() === req.params.studentId);
    if (!submission) return res.status(404).json({ message: "Submission not found!" });

    submission.grade = grade;
    await assignment.save();

    res.json({ message: "Assignment graded successfully!", assignment });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.get("/assignment", async (req, res) => {
  try {
      const assignments = await Assignment.find(); 
      res.json(assignments); 
  } catch (error) {
      console.error("Error fetching assignments:", error);
      res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;
