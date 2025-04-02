const express = require("express");
const Course = require("../models/Course");
const Student = require("../models/Student");
const Quiz = require("../models/Quiz");
const Assignment = require("../models/Assignment");
const Payment = require("../models/Payment");
const LiveSession = require("../models/LiveSession");

const router = express.Router();

// Approve 
router.put("/approve/:courseId", async (req, res) => {
  try {
    const course = await Course.findByIdAndUpdate(req.params.courseId, { status: "approved" }, { new: true });
    res.json({ message: "Course approved!", course });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Reject 
router.put("/reject/:courseId", async (req, res) => {
  try {
    const course = await Course.findByIdAndUpdate(req.params.courseId, { status: "rejected" }, { new: true });
    res.json({ message: "Course rejected!", course });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Get All Pending 
router.get("/pending-courses", async (req, res) => {
  try {
    const pendingCourses = await Course.find({ status: "pending" });
    res.json(pendingCourses);
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
  
  //  Performance Data for All Students
  router.get("/students-performance", async (req, res) => {
    try {
      const students = await Student.find().select("name email enrolledCourses");
  
      const studentPerformance = await Promise.all(students.map(async (student) => {
        const quizzes = await Quiz.find({ studentId: student._id }).select("title score");
        const assignments = await Assignment.find({ studentId: student._id }).select("title submissionUrl");
  
        return {
          studentName: student.name,
          studentEmail: student.email,
          enrolledCourses: student.enrolledCourses,
          quizScores: quizzes,
          assignmentsSubmitted: assignments
        };
      }));
  
      res.json(studentPerformance);
  
    } catch (error) {
      res.status(500).json({ error: "Internal Server Error" });
    }
  });
  
  //Get Total Revenue 
router.get("/revenue", async (req, res) => {
    try {
      const payments = await Payment.find();
  
      const totalRevenue = payments.reduce((sum, payment) => sum + payment.amountPaid, 0);
      const totalCommission = payments.reduce((sum, payment) => sum + payment.adminCommission, 0);
  
      res.json({ totalRevenue, totalCommission });
    } catch (error) {
      res.status(500).json({ error: "Internal Server Error" });
    }
  });
  
  // Get Payment Details 
  router.get("/payments", async (req, res) => {
    try {
      const payments = await Payment.find()
        .populate("studentId", "name email")
        .populate("courseId", "title")
        .populate("instructorId", "name email");
  
      res.json(payments);
    } catch (error) {
      res.status(500).json({ error: "Internal Server Error" });
    }
  });

  //  Schedule Session
router.post("/live-sessions", async (req, res) => {
    try {
      const { courseId, instructorId, sessionTitle, sessionDate, sessionLink } = req.body;
      
      const newSession = new LiveSession({ courseId, instructorId, sessionTitle, sessionDate, sessionLink });
      await newSession.save();
  
      res.json({ message: "Live session scheduled successfully!", session: newSession });
    } catch (error) {
      res.status(500).json({ error: "Internal Server Error" });
    }
  });
  
  //  Get All Sessions
  router.get("/live-sessions", async (req, res) => {
    try {
      const sessions = await LiveSession.find()
        .populate("courseId", "title")
        .populate("instructorId", "name email");
  
      res.json(sessions);
    } catch (error) {
      res.status(500).json({ error: "Internal Server Error" });
    }
  });
  
  // Cancel Session
  router.delete("/live-sessions/:id", async (req, res) => {
    try {
      await LiveSession.findByIdAndDelete(req.params.id);
      res.json({ message: "Live session cancelled successfully!" });
    } catch (error) {
      res.status(500).json({ error: "Internal Server Error" });
    }
  });
  
module.exports = router;
