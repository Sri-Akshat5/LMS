const express = require("express");
const Quiz = require("../models/Quiz");
const router = express.Router();

// Create 
router.post("/create", async (req, res) => {
  try {
    const { title, courseId, questions } = req.body;

    if (!title || !courseId || !questions.length) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const quiz = new Quiz({ title, courseId, questions });
    await quiz.save();

    res.status(201).json({ message: "Quiz created successfully!", quiz });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Get by Course ID
router.get("/course/:courseId", async (req, res) => {
  try {
    const quizzes = await Quiz.find({ courseId: req.params.courseId });
    res.json(quizzes);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.get("/quizzes", async (req, res) => {
  try {
      const quizzes = await Quiz.find(); // Fetch all quizzes from DB
      res.json(quizzes);
  } catch (error) {
      console.error("Error fetching quizzes:", error);
      res.status(500).json({ error: "Internal Server Error" });
  }
});

// Attempt 
router.post("/attempt/:quizId", async (req, res) => {
  try {
    const { answers } = req.body; 
    const quiz = await Quiz.findById(req.params.quizId);

    if (!quiz) return res.status(404).json({ message: "Quiz not found!" });

    let score = 0;
    quiz.questions.forEach((q, index) => {
      if (q.correctAnswer === answers[index]) score++;
    });

    res.json({ message: "Quiz submitted successfully!", score });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;
