const express = require("express");
const Course = require("../models/Course");
const router = express.Router();

// Add (Admin)
router.post("/create", async (req, res) => {
  try {
    const { title, description, instructor, price, lessons } = req.body;
    const newCourse = new Course({ title, description, instructor, price, lessons });
    await newCourse.save();
    res.status(201).json({ message: "Course created successfully!", course: newCourse });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Update (Admin)
router.put("/:id", async (req, res) => {
  try {
    const course = await Course.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!course) return res.status(404).json({ message: "Course not found!" });
    res.json({ message: "Course updated successfully!", course });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Delete (Admin)
router.delete("/:id", async (req, res) => {
  try {
    const course = await Course.findByIdAndDelete(req.params.id);
    if (!course) return res.status(404).json({ message: "Course not found!" });
    res.json({ message: "Course deleted successfully!" });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Get All (Admin)
router.get("/all", async (req, res) => {
  try {
    const courses = await Course.find().populate("instructor", "name email");
    res.json(courses);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Available (Students)
router.get("/", async (req, res) => {
    try {
      const courses = await Course.find({}, "title description price").populate("instructor", "name");
      res.json(courses);
    } catch (error) {
      res.status(500).json({ error: "Internal Server Error" });
    }
  });
  
  // Enroll (Student)
  router.post("/enroll/:id", async (req, res) => {
    try {
      const course = await Course.findById(req.params.id);
      if (!course) return res.status(404).json({ message: "Course not found!" });
  
      if (course.enrolledStudents.includes(req.body.studentId)) {
        return res.status(400).json({ message: "Already enrolled in this course!" });
      }
  
      course.enrolledStudents.push(req.body.studentId);
      await course.save();
      res.json({ message: "Enrolled successfully!" });
    } catch (error) {
      res.status(500).json({ error: "Internal Server Error" });
    }
  });
  
  // Enrolled (Student)
  router.get("/my-courses/:studentId", async (req, res) => {
    try {
      const courses = await Course.find({ enrolledStudents: req.params.studentId });
      res.json(courses);
    } catch (error) {
      res.status(500).json({ error: "Internal Server Error" });
    }
  });
  

  

module.exports = router;
