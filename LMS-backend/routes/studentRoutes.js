const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Student = require("../models/Student");
const LiveSession = require("../models/LiveSession");
const Quiz = require("../models/Quiz");
const Assignment = require("../models/Assignment");


const router = express.Router();

// Register
router.post("/register", async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    let student = await Student.findOne({ email });
    if (student) return res.status(400).json({ message: "Student already exists" });

    const hashedPassword = await bcrypt.hash(password, 10);
    
    student = new Student({ name, email, password: hashedPassword });
    await student.save();

    res.status(201).json({ message: "Student registered successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Login
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "Email and password are required" });
    }

    const student = await Student.findOne({ email });
    if (!student) return res.status(400).json({ message: "Invalid credentials" });

    const isMatch = await bcrypt.compare(password, student.password);
    if (!isMatch) return res.status(400).json({ message: "Invalid credentials" });

    const token = jwt.sign({ id: student._id }, process.env.JWT_SECRET, { expiresIn: "7d" });

    res.json({ token, student: { id: student._id, name: student.name, email: student.email } });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});
// Account 

router.get("/account", async (req, res) => {
  try {
      // Extract token from Authorization header
      const token = req.headers.authorization?.split(" ")[1];
      if (!token) {
          return res.status(401).json({ error: "Unauthorized access. Please log in." });
      }

      // Verify token and extract `userId` (which is actually `_id`)
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      const user = await Student.findById(decoded.userId); // Use `_id`

      if (!user) {
          return res.status(404).json({ error: "User not found." });
      }

      res.json({
          success: true,
          message: "Account details retrieved successfully.",
          name: user.name,
          email: user.email,
      });
  } catch (error) {
      console.error("Error in /account route:", error);
      res.status(500).json({ error: "Internal server error." });
  }
});

router.get("/student", async (req, res) => {
  try {
      const student = await Student.find(); // Fetch all quizzes from DB
      res.json(student);
  } catch (error) {
      console.error("Error fetching student:", error);
      res.status(500).json({ error: "Internal Server Error" });
  }
});




//  Profile
router.get("/:id", async (req, res) => {
  try {
    const student = await Student.findById(req.params.id)
      .populate("enrolledCourses", "title description");

    if (!student) return res.status(404).json({ message: "Student not found!" });

    res.json({
      success: true,
      name: student.name,  
      email: student.email, 
      enrolledCourses: student.enrolledCourses
    });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});


//  Get Sessions 
router.get("/live-sessions", async (req, res) => {
  try {
    const sessions = await LiveSession.find({ status: "Scheduled" })
      .populate("courseId", "title")
      .populate("instructorId", "name email");

    res.json(sessions);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Student Session Chat
router.post("/live-sessions/:id/chat", async (req, res) => {
  try {
    const { studentId, message } = req.body;
    
    const session = await LiveSession.findById(req.params.id);
    if (!session) return res.status(404).json({ error: "Session not found" });

    session.chat.push({ studentId, message });
    await session.save();

    res.json({ message: "Message sent successfully!", chat: session.chat });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Student's Performance
router.get("/performance/:studentId", async (req, res) => {
  try {
    const student = await Student.findById(req.params.studentId);
    if (!student) return res.status(404).json({ error: "Student not found" });

    const quizzes = await Quiz.find({ studentId: req.params.studentId }).select("title score");

    const assignments = await Assignment.find({ studentId: req.params.studentId }).select("title submissionUrl");

    res.json({
      studentName: student.name,
      studentEmail: student.email,
      enrolledCourses: student.enrolledCourses,
      quizScores: quizzes,
      assignmentsSubmitted: assignments
    });

  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});
module.exports = router;
